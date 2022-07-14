class DFA {
    state = 'START'
    seq = ''

    restore() {
        this.state = 'START'
        this.seq = ''
    }

    _entries = []
    _recieveCharHandler() {}

    onFinish() {}
}

const EndStates = [
    'END', 'ENDB', 'ERROR'
]

export class DFAFactory {

    /**
     * @param {string} str 
     * @returns {DFA}
     */
    build(str) {
        let statesMap = new Map(),
            lines = str.split('\n'),
            line = lines.length,
            nameMatcher = /^([A-Z]+)[\s]*:/m,
            ruleMatcher = /[\s]*([\s\S]+)[\s]*=>[\s]*([A-Z]+)/,
            regularStateName = '',
            dfa = new DFA()

        
        for(let i = 0; i < line; i++) {
            let _line = lines[i],
                matched = ''

            if (nameMatcher.test(_line)) {
                matched = nameMatcher.exec(_line)
                if (matched) {
                    regularStateName = matched[1]
                }
            } else {
                matched = ruleMatcher.exec(_line)
                if (matched) {
                    const [recieve, toState] = matched.slice(1),
                        reciever = this._parseReciever(recieve)

                    if (!statesMap.has(regularStateName)) {
                        statesMap.set(regularStateName, [])
                    }

                    const arr = statesMap.get(regularStateName)

                    reciever.forEach(recv => {
                        arr.push([recv, toState])
                    })
                }
            }
        }

        if (!this._isStatesMapValid(statesMap)) {
            return null
        }

        dfa._entries = statesMap.get('START').map(([k]) => k)
        this._buildOnCharHandler(statesMap, dfa)

        return dfa
    }

    /**@private*/ _buildOnCharHandler(statesMap, dfa) {
        const functionWrapper = (body) => `dfa._recieveCharHandler = (function(ch){${body}})`,
            _is = (ch, body) => {
                switch (ch) {
                    case '*':
                        return `else{${body}}`
                
                    case '**':
                        return `else if(ch === '*'){${body}}`

                    default:
                        return `else if(ch === '${ch}'){${body}}`
                }
            },
            _range = (from, to, body) => `else if(ch >= '${from}' && ch <= '${to}'){${body}}`

        let funcBody = ''

        statesMap.forEach((v, k) => {
            funcBody += `if(this.state !== '${k}');\n`

            v.forEach(([matcher, toState]) => {
                if (matcher.includes('-') && matcher.length > 1) {
                    const [from, to] = matcher.split('-')
                    
                    switch(toState) {
                        case 'ENDB':
                        case 'ERROR':
                        funcBody += _range(
                            from.trim(), to.trim(), `this.state = '${toState}';return this.onFinish(this.seq, this.state)`
                        )
                        break;

                        case 'END':
                        default:
                        funcBody += _range(
                            from.trim(), to.trim(), `this.seq += ch\nthis.state = '${toState}';return ${
                                toState === 'END'
                                    ? 'this.onFinish(this.seq, this.state)'
                                    : ''
                            }`
                        )
                    }
                    return
                }

                switch(toState) {
                    
                    case 'ENDB':
                    case 'ERROR':
                    funcBody += _is(
                        matcher, `this.state = '${toState}';return this.onFinish(this.seq, this.state)`
                    )
                    break;

                    case 'END':
                    default:
                    funcBody += _is(
                        matcher, `this.seq += ch\nthis.state = '${toState}';return ${
                            toState === 'END'
                                ? 'this.onFinish(this.seq, this.state)'
                                : ''
                        }`
                    )
                }

            })
        })

        eval(functionWrapper(funcBody))
    }

    /**@private*/ _parseSingleReciever(recv) {
        if (!recv) {
            throw 'No valid matchers'
        }

        if (recv === "'") {
            recv = "\\'"
        }

        if (this._canConvertToNumber(recv)) {
            return String.fromCodePoint(parseInt(recv))
        }

        if (recv.includes('-')) {
            return recv
        }

        return recv
    }

    /**@private*/ _parseReciever(recv) {
        if (!~recv.indexOf('|')) {
            return [this._parseSingleReciever(recv.trim())]
        }

        return recv.split('|').map(v => {
            return this._parseSingleReciever(v.trim())
        })
    }

    /**@private*/ _canConvertToNumber(str) {
        return !isNaN(+str)
    }

    /**
     * @private
     * @param {Map<string, [string, string][]>} statesMap
     * */
    _isStatesMapValid(statesMap) {
        if (!statesMap.has('START')) {
            throw "No starting state."
        }

        statesMap.get('START').forEach(([k]) => {
            if (k === '*') {
                throw "'*' cannot be used in the starting state."
            }
        })

        if (statesMap.has('END')) {
            throw "The END state cannot be modified"
        }

        if (statesMap.has('ENDB')) {
            throw "The ENDB state cannot be modified"
        }

        if (statesMap.has('ERROR')) {
            throw "The ERROR state cannot be modified"
        }

        // let strategy = {}
        // statesMap.forEach((v, k) => {
        //     strategy[k] = new Array(v.length).fill(0)
        // })

        //测试DFA是否有效
        return true
    }
}