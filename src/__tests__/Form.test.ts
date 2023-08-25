import { describe, test, expect } from "vitest";
import { FormControl, FormTypeEnum, FormValue } from "../Form";
import { v4 as uuid } from "uuid";

describe("FormControl", () => {
  test("text, initialize value from initialValue", () => {
    const control = new FormControl({
      formItem: {
        label: "text",
        type: "text",
        initialValue: "hello text",
      },
    });

    expect(control.formItem).toMatchObject({
      value: "hello text",
      label: "text",
    });

    control.answerFormItem({
      formValue: {
        id: control.formItem.id,
        value: "greeting text",
      } as FormValue,
    });
    expect(control.formItem).toMatchObject({
      value: "greeting text",
      label: "text",
    });
  });

  test("text, initialize parentID from parent id", () => {
    const [id0, id1, id2, id3] = Array.from({ length: 4 }).map(() => uuid());
    const text = { type: "text" as FormTypeEnum };
    const control = new FormControl({
      formItem: {
        id: id0,
        label: "root",
        type: "div",
        initialValue: "hello text",
        children: [
          { ...text, id: id1, label: "morning", value: "good morning" },
          { ...text, id: id2, label: "afternoon", value: "good afternoon" },
          { ...text, id: id3, label: "evening", value: "good evening" },
        ],
      },
    });

    expect(control.getFormItem({ id: id0 })).toMatchObject({
      label: "root",
      parentID: undefined,
      value: "hello text",
    });

    expect(control.getFormItem({ id: id1 })).toMatchObject({
      label: "morning",
      parentID: id0,
      value: "good morning",
    });

    expect(control.getFormItem({ id: id2 })).toMatchObject({
      label: "afternoon",
      parentID: id0,
      value: "good afternoon",
    });

    expect(control.getFormItem({ id: id3 })).toMatchObject({
      label: "evening",
      parentID: id0,
      value: "good evening",
    });
  });

  test("text, flatten answer", () => {
    const [id0, id1, id2, id3] = [uuid(), uuid(), uuid(), uuid()];
    const text = { type: "text" as FormTypeEnum };
    const control = new FormControl({
      formItem: {
        id: id0,
        label: "root",
        type: "div",
        initialValue: "hello text",
        children: [
          { ...text, id: id1, label: "morning", value: "good morning" },
          { ...text, id: id2, label: "afternoon", value: "good afternoon" },
          { ...text, id: id3, label: "evening", value: "good evening" },
        ],
      },
    });

    expect(control.getFlattenAnsweredFormItems()).toMatchObject([
      { id: id0, value: "hello text", parentID: undefined },
      { id: id1, value: "good morning", parentID: id0 },
      { id: id2, value: "good afternoon", parentID: id0 },
      { id: id3, value: "good evening", parentID: id0 },
    ]);

    control.answerFormItem({
      formValue: {
        id: id1,
        value: "greeting morning",
      } as FormValue,
    });

    expect(control.getFlattenAnsweredFormItems()).toMatchObject([
      { id: id0 },
      { id: id1, value: "greeting morning", parentID: id0 },
      { id: id2 },
      { id: id3 },
    ]);
  });

  test("number", () => {
    const id0 = uuid();
    const control = new FormControl({
      formItem: {
        id: id0,
        label: "height",
        type: "number",
        initialValue: "6.7",
      },
    });

    expect(control.getFormItem({ id: id0 })).toMatchObject({
      id: id0,
      value: "6.7",
    });

    control.answerFormItem({ formValue: { id: id0, value: "6.8" } });

    expect(control.getFormItem({ id: id0 })).toMatchObject({
      id: id0,
      value: "6.8",
    });
  });

  test("checkbox", () => {
    const id0 = uuid();
    const control = new FormControl({
      formItem: {
        id: id0,
        label: "do you agree?",
        type: "checkbox",
        initialValue: "false",
      },
    });

    expect(control.getFormItem({ id: id0 })).toMatchObject({
      id: id0,
      value: "false",
    });

    control.answerFormItem({ formValue: { id: id0, value: "true" } });

    expect(control.getFormItem({ id: id0 })).toMatchObject({
      id: id0,
      value: "true",
    });
  });

  test("select, morning, afternoon, evening", () => {
    const [id0, id1, id2, id3] = Array.from({ length: 4 }).map(() => uuid());
    const option = { type: "option" as FormTypeEnum };
    const control = new FormControl({
      formItem: {
        id: id0,
        label: "gender",
        type: "select",
        initialValue: "hello text",
        children: [
          { ...option, id: id1, label: "morning", value: "MORNING" },
          { ...option, id: id2, label: "afternoon", value: "AFTERNOON" },
          { ...option, id: id3, label: "evening", value: "EVENING" },
        ],
      },
    });

    expect(control.getFormItem({ id: id0 })).toMatchObject({
      id: id0,
      type: "select",
      value: "hello text",
    });

    control.answerFormItem({ formValue: { id: id0, value: "MORNING" } });
    expect(control.getFormItem({ id: id0 })).toMatchObject({
      id: id0,
      type: "select",
      value: "MORNING",
    });

    control.answerFormItem({ formValue: { id: id0, value: "AFTERNOON" } });
    expect(control.getFormItem({ id: id0 })).toMatchObject({
      id: id0,
      type: "select",
      value: "AFTERNOON",
    });

    control.answerFormItem({ formValue: { id: id0, value: "EVENING" } });
    expect(control.getFormItem({ id: id0 })).toMatchObject({
      id: id0,
      type: "select",
      value: "EVENING",
    });
  });

  test("radio, coffee, tea, soda", () => {
    const [id0, id1, id2, id3] = Array.from({ length: 4 }).map(() => uuid());
    const radio = { type: "radio" as FormTypeEnum };
    const control = new FormControl({
      formItem: {
        id: id0,
        label: "drink",
        type: "radioname",
        initialValue: "hello text",
        children: [
          { ...radio, id: id1, label: "coffee", value: "COFFEE" },
          { ...radio, id: id2, label: "tea", value: "TEA" },
          { ...radio, id: id3, label: "soda", value: "SODA" },
        ],
      },
    });

    expect(control.getFormItem({ id: id0 })).toMatchObject({
      id: id0,
      type: "radioname",
      value: "hello text",
    });

    control.answerFormItem({ formValue: { id: id0, value: "COFFEE" } });
    expect(control.getFormItem({ id: id0 })).toMatchObject({
      id: id0,
      type: "radioname",
      value: "COFFEE",
    });

    control.answerFormItem({ formValue: { id: id0, value: "TEA" } });
    expect(control.getFormItem({ id: id0 })).toMatchObject({
      id: id0,
      type: "radioname",
      value: "TEA",
    });

    control.answerFormItem({ formValue: { id: id0, value: "SODA" } });
    expect(control.getFormItem({ id: id0 })).toMatchObject({
      id: id0,
      type: "radioname",
      value: "SODA",
    });
  });
});
