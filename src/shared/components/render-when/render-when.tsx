import * as React from "react";

type WhenProps = {
  children: React.ReactNode;
  isTrue?: boolean;
};

type IfProps = {
  children: React.ReactNode;
  isTrue?: boolean;
};

type ElseProps = {
  children: React.ReactNode;
};

const RenderWhen = ({ children, isTrue = true }: WhenProps) => {
  if (!isTrue) return null;

  const validChildren: React.ReactElement[] = React.Children.toArray(children)
    .filter(React.isValidElement)
    .filter(
      (child: React.ReactElement) =>
        child.type === RenderWhen.If || child.type === RenderWhen.Else
    ) as React.ReactElement[];

  const matches: React.ReactElement[] = [];

  for (const child of validChildren) {
    if (child.type === RenderWhen.If && (child.props as IfProps).isTrue) {
      matches.push(child);
    }
  }

  if (matches.length > 0) {
    return <>{matches}</>;
  }

  const elseChild = validChildren.find(
    (child) => child.type === RenderWhen.Else
  );
  return elseChild ? <>{elseChild}</> : null;
};

const If = ({ children, isTrue = true }: IfProps) =>
  isTrue ? <>{children}</> : null;
If.displayName = "RenderWhen.If";

const Else = ({ children }: ElseProps) => <>{children}</>;
Else.displayName = "RenderWhen.Else";

RenderWhen.If = If;
RenderWhen.Else = Else;

export default RenderWhen;
