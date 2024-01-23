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
  children,
}: UIArrayFormControlProps) => {
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  });

  return children(fields, append, remove);
};

export default UIArrayFormControl;
