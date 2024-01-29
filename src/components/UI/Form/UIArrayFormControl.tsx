import {
  UseFieldArrayAppend,
  UseFieldArrayProps,
  UseFieldArrayRemove,
  useFieldArray,
} from "react-hook-form";

type UIArrayFormControlProps = UseFieldArrayProps<any> & {
  children: (
    fields: Record<"id", string>[],
    append: UseFieldArrayAppend<any, string>,
    remove: UseFieldArrayRemove,
  ) => JSX.Element;
};

const UIArrayFormControl = ({
  name,
  control,
  rules,
  children,
}: UIArrayFormControlProps) => {
  const { fields, append, remove } = useFieldArray({
    name,
    control,
    rules,
  });

  return children(fields, append, remove);
};

export default UIArrayFormControl;
