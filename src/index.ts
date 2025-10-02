import * as flsFunctions from "./ts/functions/functions";
import { Burger } from "./ts/ui/burger";
import "./assets/scss/main.scss";

flsFunctions.isWebp();
flsFunctions.isAvif();

new Burger();
