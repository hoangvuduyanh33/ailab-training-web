import { SingleQuestionProps } from "src/components/SingleQuestion/SingleQuestion";

export const exampleTask = {
  name: "Example Task",
  content: `[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=codesandbox)](https://codesandbox.io/embed/react-md-editor-preview-markdown-vrucl?fontsize=14&hidenavigation=1&theme=dark)
\`\`\`jsx
import React from "react";
import ReactDOM from "react-dom";
import MDEditor from '@uiw/react-md-editor';

export default function App() {
return (
<div className="container">
  <MDEditor.Markdown source="Hello Markdown!" />                                                                                                                  
</div>
);
}
\`\`\``,
};

export const exampleQuestions = [
  {
    name: "Question 1",
    id: "1",
    menteeName: "Nguyen Van A",
    menteeId: "1",
    numReply: 10,
    timestamp: Date.now(),
  },
  {
    name: "Question 2",
    id: "2",
    menteeName: "Nguyen Van A",
    menteeId: "1",
    numReply: 10,
    timestamp: Date.now(),
  },
  {
    name: "Question 3",
    id: "3",
    menteeName: "Nguyen Van A",
    menteeId: "1",
    numReply: 10,
    timestamp: Date.now(),
  },
  {
    name: "Question 4",
    id: "4",
    menteeName: "Nguyen Van A",
    menteeId: "1",
    numReply: 10,
    timestamp: Date.now(),
  },
];

export const exampleTopQuestions = [
  {
    name: "Question 1",
    id: "4",
    menteeName: "Nguyen Van A",
    menteeId: "1",
    numReply: 10,
    timestamp: Date.now(),
  },
  {
    name: "Question 2",
    id: "4",
    menteeName: "Nguyen Van A",
    menteeId: "1",
    numReply: 10,
    timestamp: Date.now(),
  },
  {
    name: "Question 3",
    id: "4",
    menteeName: "Nguyen Van A",
    menteeId: "1",
    numReply: 10,
    timestamp: Date.now(),
  },
];

export const exampleQuestion: SingleQuestionProps = {
  menteeName: "Nguyen Van An",
  menteeId: "1",
  name: "Question 1",
  content: "Why?",
  timestamp: Date.now(),
  replies: [
    {
      userName: "Dinh Van Binh",
      userId: "2",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac ex nisl. Cras quis quam in ipsum semper mattis. Nunc sit amet pretium turpis, at cursus ante. Nam vulputate fringilla dolor sed hendrerit. Nam tempus lacus neque. Pellentesque pulvinar eu neque vel bibendum. Donec scelerisque quam eget tellus semper tincidunt eu ac ex. Quisque vitae urna elit. Sed non arcu tincidunt, tempus risus at, iaculis neque. Curabitur sodales nibh dapibus neque tincidunt pharetra. Morbi auctor ante in rhoncus ornare. Donec diam leo, viverra vitae libero pharetra, rhoncus porttitor diam. Nulla tempus iaculis nulla, eu cursus arcu vehicula sed.

      Curabitur orci nunc, fermentum vitae pulvinar vitae, gravida nec tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non placerat nulla. Nunc varius maximus vulputate. Cras vel felis et est scelerisque pretium. Sed posuere lacinia sapien, eu ultrices lorem condimentum vitae. Nulla facilisi. Donec at tortor eget felis fermentum sollicitudin at vel lorem. Quisque eget diam semper, molestie elit non, scelerisque leo. Vestibulum molestie elementum mollis. Duis turpis turpis, facilisis vitae ante quis, elementum dapibus erat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque a varius magna. Vivamus gravida dolor a dictum congue.
      
      Aenean ultrices blandit dui in laoreet. Duis maximus magna vel neque efficitur fermentum. Maecenas sagittis vel nisi id suscipit. Vestibulum et mi feugiat, eleifend ligula in, interdum ligula. Sed bibendum quam vel venenatis rhoncus. Maecenas sed mi vel ligula condimentum fermentum. Ut non dolor sed diam vulputate finibus. Vestibulum vitae eros molestie, fermentum arcu non, semper nisi. Sed consectetur tortor ac lectus placerat luctus. Duis cursus lorem at nibh tempus, eu lobortis ipsum bibendum. Nulla eget efficitur felis.
      
      In iaculis quam eget iaculis suscipit. Duis sit amet lobortis urna. Nullam sed velit lectus. Morbi sit amet ante gravida ligula condimentum rhoncus. In at efficitur libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc nec turpis scelerisque, pulvinar risus eget, posuere est. Donec sagittis dui facilisis, feugiat ipsum in, posuere mauris. Pellentesque ornare cursus dapibus. Suspendisse congue nibh rhoncus libero malesuada, quis egestas massa tincidunt. Duis varius nunc vitae dapibus cursus. Vestibulum sit amet sollicitudin risus, ac lobortis justo. Donec consectetur at ante tempor tempor.
      
      Integer eu accumsan augue. Maecenas in quam lorem. Etiam vehicula, massa et suscipit suscipit, velit lorem bibendum velit, sit amet ullamcorper lacus felis vel diam. Vivamus ut ipsum malesuada, scelerisque leo eget, commodo lacus. Praesent eget vehicula tortor. Integer placerat ultricies neque non malesuada. Nam felis metus, interdum et diam vitae, iaculis commodo lorem. Phasellus finibus tellus nec nisl gravida tincidunt.`,
      timestamp: Date.now(),
    },
    {
      userName: "Le Van Ce",
      userId: "3",
      content: "Reply 1",
      timestamp: Date.now(),
    },
    {
      userName: "Nguyen Van D",
      userId: "2",
      content: "Reply 1",
      timestamp: Date.now(),
    },
    {
      userName: "David Degea",
      userId: "2",
      content: "Reply 1",
      timestamp: Date.now(),
    },
  ],
};
