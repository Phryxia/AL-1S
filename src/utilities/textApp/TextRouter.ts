import {
  TextRouterContext,
  TextRouterCallback,
  TextRouterCondition,
} from "./shared";

export class TextRouter {
  protected subRouters: {
    condition: TextRouterCondition;
    router: TextRouter;
  }[] = [];

  public constructor(private callback?: TextRouterCallback) {}

  /* 
    condition이 string이면, 해당 토큰을 매칭하고 공백을 한 칸 띄운 뒤 나머지 매칭
    condition이 RegExp인 경우, 해당 패턴 이외에는 전부 remainText로 매칭
  */
  public use(condition: TextRouterCondition, subRouter: TextRouter): void {
    this.subRouters.push({ condition, router: subRouter });
  }

  public run(context: TextRouterContext): boolean {
    const isSubMatched = this.subRouters.reduce(
      (isMatched, { condition, router }) => {
        if (isMatched) return true;

        const { remainText, currentPath } = context;
        const [, matchedText, remain = ""] =
          TextRouter.match(remainText, condition) ?? [];

        if (!matchedText) return false;

        const subContext: TextRouterContext = {
          ...context,
          currentPath: [...currentPath, matchedText],
          remainText: remain,
        };

        return router.run(subContext);
      },
      false
    );

    if (!isSubMatched) {
      this.callback?.(context);
    }

    return true;
  }

  protected static match(
    text: string,
    condition: TextRouterCondition
  ): [string, string, string?] | null {
    let innerRegExpInString: string;
    if (condition instanceof RegExp) {
      innerRegExpInString = condition.toString().match(/\/(.*)\/.*/)[1];
    } else {
      innerRegExpInString = TextRouter.escape(condition);
    }

    const regexp = new RegExp(`(${innerRegExpInString})(?:\\s+(.+))?`);

    return (text.match(regexp)?.slice(0, 3) ?? null) as
      | [string, string, string]
      | null;
  }

  // todo
  private static escape(s: string): string {
    return s.replace(/(\.|\+|\$|\^|\(|\)|\{|\}|\\)/, "\\$1");
  }
}