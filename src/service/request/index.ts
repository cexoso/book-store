// Axios 本身就是一个很好的同构请求库了，没必要再拆分成不能的实现了
import type { Axios } from "axios";

export const Request = "request";
export type IRequest = Axios;
