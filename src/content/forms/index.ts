import type { Lesson } from "@/types/lesson";
import { lesson as whyFormsExist } from "./01-why-forms-exist";
import { lesson as theFormElement } from "./02-the-form-element";
import { lesson as textInputsLabels } from "./03-text-inputs-labels";
import { lesson as inputTypes } from "./04-input-types";
import { lesson as checkboxesRadios } from "./05-checkboxes-radios";
import { lesson as selectDatalist } from "./06-select-datalist";
import { lesson as textareaOtherElements } from "./07-textarea-other-elements";
import { lesson as html5Validation } from "./08-html5-validation";
import { lesson as stylingForms } from "./09-styling-forms";
import { lesson as httpMethods } from "./10-http-methods";
import { lesson as formAccessibility } from "./11-form-accessibility";
import { lesson as capstone } from "./12-capstone";
import { lesson as codelabContactForm } from "./13-codelab-contact-form";
import { lesson as codelabSurveyForm } from "./14-codelab-survey-form";

export const formsLessons: Lesson[] = [
  whyFormsExist,
  theFormElement,
  textInputsLabels,
  inputTypes,
  checkboxesRadios,
  selectDatalist,
  textareaOtherElements,
  html5Validation,
  stylingForms,
  httpMethods,
  formAccessibility,
  capstone,
  codelabContactForm,
  codelabSurveyForm,
];
