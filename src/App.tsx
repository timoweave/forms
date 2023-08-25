/* eslint-disable react-refresh/only-export-components */
import { FormItem, useForm } from "./Form";
import "./App.css";

export const App = () => {
  const form1 = useForm({
    label: "Software Version",
    type: "radioname",
    children: [
      { label: "Alpha", value: "ALPHA", type: "radio" },
      { label: "Beta", value: "BETA", type: "radio" },
      { label: "Gamma", value: "GAMMA", type: "radio" },
      { label: "Delta", value: "DELTA", type: "radio" },
    ],
  });

  const form2 = useForm({
    type: "div",
    children: [
      { label: "Example of some select or radio", type: "h1" },
      {
        label: "Job Description",
        type: "textarea",
      },
      {
        label: "Do you agree?",
        type: "checkbox",
        initialValue: "false",
      },
      {
        label: "Single Selection Dropdown",
        type: "select",
        children: [
          { label: "Alpha", value: "ALPHA", type: "option" },
          { label: "Beta", value: "BETA", type: "option" },
          { label: "Gamma", value: "GAMMA", type: "option" },
        ],
      },
      {
        type: "radioname",
        label: "Single Option",
        children: [
          { label: "Single Option", type: "h2" },
          { label: "Alpha", value: "ALPHA", type: "radio" },
          { label: "Beta", value: "BETA", type: "radio" },
          { label: "Gamma", value: "GAMMA", type: "radio" },
        ],
      },
    ],
  });

  const form3 = useForm({
    type: "div",
    children: [
      { label: "Various Inputs", type: "h1" },
      {
        type: "div",
        children: [
          { label: "Name", type: "h2" },
          {
            label: "First Name",
            type: "text",
            placeholder: "First name",
          },
          {
            label: "Last Name",
            type: "text",
            placeholder: "Family Name",
          },
          {
            label: "Legal Name",
            type: "text",
            placeholder: "Legal Name",
          },
          {
            label: "Prefer Name",
            type: "text",
            placeholder: "Nick Name",
          },
        ],
      },
      {
        type: "div",
        children: [
          { label: "Personal Info", type: "h2" },
          {
            label: "Age",
            type: "number",
            initialValue: "1",
          },
          {
            label: "Height",
            type: "number",
            initialValue: "5",
          },
          {
            label: "Race",
            type: "select",
            initialValue: "MIDDLE_EASTERN",
            children: [
              {
                label: "Eurasian",
                value: "EURASIAN",
                type: "option",
              },
              {
                label: "Asian",
                value: "ASIAN",
                type: "option",
              },
              {
                label: "White",
                value: "WHITE",
                type: "option",
              },
              {
                label: "Black",
                value: "BLACK",
                type: "option",
              },
              {
                label: "Latin American",
                value: "LATIN_AMERICAN",
                type: "option",
              },
              {
                label: "Middle Eastern",
                value: "MIDDLE_EASTERN",
                type: "option",
              },
            ],
          },
        ],
      },
      {
        type: "div",
        children: [
          { label: "Mailing Address", type: "h2" },
          {
            label: "Street",
            type: "text",
            initialValue: "",
          },
          {
            label: "City",
            type: "text",
            initialValue: "",
          },
          {
            label: "State",
            type: "text",
            initialValue: "",
          },
        ],
      },
    ],
  });

  return (
    <div style={{ width: "100%" }}>
      <FormItem formControl={form1.formControl} onSubmit={console.log} />
      <hr style={{ margin: "3rem auto" }} />
      <FormItem formControl={form2.formControl} onSubmit={console.log} />
      <hr style={{ margin: "3rem auto" }} />
      <FormItem formControl={form3.formControl} onSubmit={console.log} />
    </div>
  );
};
