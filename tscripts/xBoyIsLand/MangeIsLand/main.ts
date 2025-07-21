import { system } from "@minecraft/server";

import verif from "./verifyDataBase"

      ;;; "依赖初始化完毕";;;
let cont = 0;
system.runInterval(() => {
      if (cont < 4) {
            verif()
            cont++;
      }

})