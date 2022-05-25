import { ref, computed } from "vue";

export class BookForSell {
  public constructor(public readonly id: string) {}
  public name = "";
  public count = ref(0);
  public setCount(count: number) {
    this.count.value = count;
  }
  public readonly state = computed(() => {
    const conut = this.count.value;
    if (conut > 0) {
      return "在售";
    }
    return "已卖完";
  });
}
