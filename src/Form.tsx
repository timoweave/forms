/* eslint-disable react-refresh/only-export-components */
import { useRef } from "react";
import { v4 as uuid } from "uuid";

export const FORM_TYPE_ENUM = {
  div: "div",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  text: "text",
  label: "label",
  number: "number",
  select: "select",
  option: "option",
  textarea: "textarea",
  checkbox: "checkbox",
  radioname: "radioname",
  radio: "radio",
} as const;

export type FormTypeEnum = (typeof FORM_TYPE_ENUM)[keyof typeof FORM_TYPE_ENUM];

export interface NonNullableFormItem {
  id: string;
  parentID: string;
  value: string;
  label: string;
  initialValue: string;
  type: FormTypeEnum;
  placeholder: string;
  onValidators: ((value: string) => boolean)[];
  children: FormItem[];
  Component: () => React.ReactNode;
}

export interface FormItem extends Partial<NonNullableFormItem> {}

export interface AnsweredFormItem
  extends Pick<FormItem, "id" | "value" | "label">,
    Partial<Pick<FormItem, "type" | "parentID">> {}

export interface FormValue
  extends Pick<FormItem, "id" | "value">,
    Partial<Pick<FormItem, "label" | "type">> {}

export interface FormItemsProps {
  formControl: FormControl;
  formItems: FormItem[];
}

export interface FormItemProps extends React.PropsWithChildren {
  formItem?: FormItem;
  formControl: FormControl;
  onSubmit?: (flattenFormItems: FormItem[]) => void;
}

export interface FormStyleAndTestIDProps {
  dataTestid?: string;
  style?: React.CSSProperties;
}

export interface FormCommonProps
  extends React.PropsWithChildren,
    FormStyleAndTestIDProps,
    Partial<Pick<FormItemsProps, "formItems">>,
    Required<Pick<FormItemProps, "formItem">>,
    Pick<FormItemsProps, "formControl"> {
  title?: string;
}

export interface FormComponent {
  (props: FormCommonProps): React.ReactNode;
}

export interface FormItemComponent {
  type: FormTypeEnum;
  Component: FormComponent;
}

export const FormText = (props: FormCommonProps): React.ReactNode => {
  const { formItem, formControl } = props;
  const { id, label, initialValue, placeholder = undefined } = formItem;

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <label>{label}</label>
      <input
        type="text"
        defaultValue={initialValue}
        placeholder={placeholder}
        onChange={(e) => {
          const formValue = { id, value: e.target.value };
          formControl.answerFormItem({ formValue });
        }}
      ></input>
    </div>
  );
};

export const FormNumber = (props: FormCommonProps): React.ReactNode => {
  const { formItem, formControl } = props;
  const { label, id, initialValue } = formItem;

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <label>{label}</label>
      <input
        type="number"
        defaultValue={parseInt(initialValue ?? "", 10)}
        onChange={(e) => {
          const formValue = { id, value: e.target.value };
          formControl.answerFormItem({ formValue });
        }}
      ></input>
    </div>
  );
};

export const FormCheckbox = (props: FormCommonProps): React.ReactNode => {
  const { formItem, formControl } = props;
  const { id, label, initialValue = "false" } = formItem;

  return (
    <>
      <input
        type="checkbox"
        defaultChecked={JSON.parse(initialValue) as boolean}
        onChange={(e) => {
          const formValue = { id, value: JSON.stringify(e.target.checked) };
          formControl.answerFormItem({ formValue });
        }}
      />
      <label>{label}</label>
    </>
  );
};

export const FormRadio = (props: FormCommonProps): React.ReactNode => {
  const { formItem, formControl } = props;
  const { parentID, label, value } = formItem;

  const parentFormItem = formControl.getFormItem({ id: parentID });

  return (
    <>
      <input
        type="radio"
        id={label}
        name={`${parentFormItem?.label ?? "radio"}_${parentID}`}
        onChange={() => {
          const formValue = { id: parentID, value };
          formControl.answerFormItem({ formValue });
        }}
      />
      <label htmlFor={label}>{label}</label>
    </>
  );
};

export const FormSelect = (props: FormCommonProps): React.ReactNode => {
  const { formItem, formControl, children } = props;
  const { id, label, initialValue } = formItem;

  return (
    <div style={{ width: "100%" }}>
      <label>{label}</label>
      <select
        defaultValue={initialValue}
        onChange={(e) => {
          const formValue = { id, value: e.currentTarget.value };
          formControl.answerFormItem({ formValue });
        }}
        style={{ width: "100%" }}
      >
        {children}
      </select>
    </div>
  );
};

export const FormOption = (props: FormCommonProps): React.ReactNode => {
  const { formItem } = props;
  const { label, value } = formItem;

  return <option value={value}>{label}</option>;
};

export const FormHeader = (props: FormCommonProps): React.ReactNode => {
  const { formItem } = props;
  const { type = "h1", label = "" } = formItem;

  switch (type) {
    case "h1":
      return <h1>{label}</h1>;
    case "h2":
      return <h2>{label}</h2>;
    case "h3":
      return <h3>{label}</h3>;
    default:
      <p>{label}</p>;
  }
};

export const FormLabel = (props: FormCommonProps): React.ReactNode => {
  const { formControl, formItem } = props;
  const { children = [], label } = formItem;

  return (
    <div>
      <label>{label}</label>
      <FormItems formControl={formControl} formItems={children} />
    </div>
  );
};

export const FormTextarea = (props: FormCommonProps): React.ReactNode => {
  const { formItem, formControl } = props;
  const { id, label, initialValue, placeholder } = formItem;

  return (
    <div>
      <label>{label}</label>
      <textarea
        placeholder={placeholder}
        defaultValue={initialValue}
        onChange={(e) => {
          const formValue = { id, value: e.currentTarget.value };
          formControl.answerFormItem({ formValue });
        }}
      />
    </div>
  );
};

export const Formradioname = (props: FormCommonProps): React.ReactNode => {
  const { formControl, formItem } = props;
  const { children = [], label } = formItem;

  return (
    <div>
      <label>{label}</label>
      <FormItems formControl={formControl} formItems={children} />
    </div>
  );
};

export const FormDiv = (props: FormCommonProps): React.ReactNode => {
  const { formControl, formItem } = props;
  const { children = [] } = formItem;

  return (
    <div>
      <FormItems formControl={formControl} formItems={children} />
    </div>
  );
};

export const FormItems = (props: FormItemsProps) => {
  const { formControl, formItems } = props;

  return (
    <>
      {formItems.map((formItem) => (
        <FormItem
          key={formItem.id}
          formItem={formItem}
          formControl={formControl}
        />
      ))}
    </>
  );
};

export const FormItem = (props: FormItemProps) => {
  const { formControl, onSubmit } = props;
  const { formItem = formControl.formItem } = props;
  const { id, type = "text" } = formItem;
  const Component = formItem.Component ?? formControl.getComponent({ type });

  return (
    <>
      <Component key={id} formItem={formItem} formControl={formControl}>
        <FormItems
          formItems={formItem.children ?? []}
          formControl={formControl}
        />
      </Component>
      {onSubmit && (
        <button
          style={{ width: "100%" }}
          onClick={() => {
            const flattenFormItems = formControl.getFlattenAnsweredFormItems();
            onSubmit(flattenFormItems);
          }}
        >
          Submit
        </button>
      )}
    </>
  );
};

export const FORM_ITEM_COMPONENTS: FormItemComponent[] = [
  { type: "div", Component: FormDiv },
  { type: "h1", Component: FormHeader },
  { type: "h2", Component: FormHeader },
  { type: "h3", Component: FormHeader },
  { type: "text", Component: FormText },
  { type: "label", Component: FormLabel },
  { type: "number", Component: FormNumber },
  { type: "select", Component: FormSelect },
  { type: "option", Component: FormOption },
  { type: "textarea", Component: FormTextarea },
  { type: "checkbox", Component: FormCheckbox },
  { type: "radioname", Component: Formradioname },
  { type: "radio", Component: FormRadio },
];

export class FormControl {
  formItemComponents: FormItemComponent[];
  formItem: FormItem;

  constructor(props: {
    formItem: FormItem;
    formItemComponents?: FormItemComponent[];
  }) {
    const { formItem, formItemComponents = FORM_ITEM_COMPONENTS } = props;
    this.formItemComponents = formItemComponents;
    this.formItem = this.init(formItem);
  }

  init(formItem: FormItem, parentID?: string): FormItem {
    const id = formItem.id ?? uuid();
    const value = formItem.value ?? formItem.initialValue ?? "";

    return {
      ...formItem,
      parentID,
      id,
      value,
      children: formItem.children?.map((child) => this.init(child, id)),
    };
  }

  getComponent(props: { type: FormTypeEnum }): FormComponent {
    const components = this.formItemComponents;
    const [component] = components.filter(({ type }) => type === props.type);
    if (component == null) {
      throw new Error(`cannot find component for type ${props.type}`);
    }

    return component.Component;
  }

  getFormItem(props: {
    id?: string;
    formItem?: FormItem;
    withoutChildren?: boolean;
  }): FormItem | null {
    const id = props.id;
    const formItem = props.formItem ?? this.formItem;
    const withoutChildren = props.withoutChildren ?? true;

    if (id == null) {
      return null;
    } else if (formItem.id === id) {
      if (withoutChildren) {
        return { ...formItem, children: undefined };
      }
      return formItem;
    }

    if (formItem.children == null) {
      return null;
    } else {
      return formItem.children.reduce(
        (alreadyFoundFormItem, childFormItem) =>
          alreadyFoundFormItem != null
            ? alreadyFoundFormItem
            : this.getFormItem({ id, formItem: childFormItem }),
        null as FormItem | null,
      );
    }
  }

  answerFormItem(props: { formValue: FormValue; formItem?: FormItem }): void {
    const { formValue } = props;

    const formItem = props.formItem ?? this.formItem;

    if (formItem.id === formValue.id) {
      formItem.value = formValue.value;
    } else {
      formItem.children?.forEach((childFormItem) => {
        this.answerFormItem({ formValue, formItem: childFormItem });
      });
    }
  }

  getFlattenAnsweredFormItems(props?: {
    formItem?: FormItem;
    flattenItems?: AnsweredFormItem[];
  }): AnsweredFormItem[] {
    const { id, parentID, value, type, label, children } =
      props?.formItem ?? this.formItem;
    const flattenItems: AnsweredFormItem[] = props?.flattenItems ?? [];

    if (value != null && value !== "") {
      flattenItems.push({ id, value, label, type, parentID });
    }
    if (children != null && children.length != 0) {
      const choices: FormTypeEnum[] = ["option", "radio"];
      children
        .filter(({ type }) => type && choices.includes(type) === false)
        .map((child) =>
          this.getFlattenAnsweredFormItems({ formItem: child, flattenItems }),
        );
    }
    return flattenItems;
  }
}

export const useForm = (formItem: FormItem) => {
  const formControlRef = useRef(new FormControl({ formItem }));

  return {
    formControl: formControlRef.current,
  };
};
