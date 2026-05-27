// "use client"

// import { useState, Fragment } from "react";
// import { useChat } from "@ai-sdk/react";
// import {
//   PromptInput,
//   PromptInputBody,
//   PromptInputButton,
//   type PromptInputMessage,
//   PromptInputSubmit,
//   PromptInputTextarea,
//   // PromptInputToolbar,
//   PromptInputTools,
// } from "@/components/ai-elements/prompt-input";
// // import { Response } from "@/components/ai-elements/response";
// import { Message, MessageContent } from "@/components/ai-elements/message";
// import {
//   Conversation,
//   ConversationContent,
//   ConversationScrollButton,
// } from "@/components/ai-elements/conversation";
// import { Loader } from "lucide-react";
// // import { Loader } from "@components/ai-elements/loader";

// export default function RAGChatBot() {

//   const [input, setInput] = useState("")
//   const{ messages, sendMessage, status } = useChat()

//   const handleSubmit = (message: PromptInputMessage) => {
//     if (!message.text) return;
//     sendMessage({ text: message.text });
//     setInput("");
//   };



  
//   return (
//     <div className="max-w-4xl mx-auto p-6 relative size-full h-[calc(100vh-800px)]">
//       <div className="flex flex-col h-full">
//         <Conversation className="h-full">
//           <ConversationContent>
//             {
//               messages.map((message) => (
//                 <div key={message.id}>
//                   {message.parts.map((part, i) => {
//                     switch(part.type) {
//                       case "text":
//                         return (
//                           <Fragment key={`${message.id}-${i}`}>
//                             <Message from={message.role}>
//                               <MessageContent>
//                                 <Response>
//                                   {part.text}
//                                 </Response>
//                               </MessageContent>
//                             </Message>
//                         </Fragment>
//                         );

//                       default:
//                         return null;
//                     }
//                   })}
//                 </div>
//               ))
//             }
//             {(status === "submitted" || status === "streaming") && <Loader />}
//           </ConversationContent>
//           <ConversationScrollButton />
//         </Conversation>

//         <PromptInput onSubmit={handleSubmit} className="mt-4">
//           <PromptInputBody>
//             <PromptInputTextarea value={input} onChange={(e) => setInput(e.target.value)} />
//           </PromptInputBody>
//           <PromptInputTools>
//             {/* Moddel selector, web search etc */}
//           </PromptInputTools>
//           <PromptInputSubmit />
//         </PromptInput>


//       </div>
//     </div>
//   )
// }



"use client";

import {
  Attachment,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
} from "@/components/ai-elements/attachments";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionAddScreenshot,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputBody,
  PromptInputButton,
  PromptInputHeader,
  type PromptInputMessage,
  PromptInputSelect,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
  usePromptInputAttachments,
} from "@/components/ai-elements/prompt-input";
import { GlobeIcon } from "lucide-react";
import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";

const PromptInputAttachmentsDisplay = () => {
  const attachments = usePromptInputAttachments();

  if (attachments.files.length === 0) {
    return null;
  }

  return (
    <Attachments variant="inline">
      {attachments.files.map((attachment) => (
        <Attachment
          data={attachment}
          key={attachment.id}
          onRemove={() => attachments.remove(attachment.id)}
        >
          <AttachmentPreview />
          <AttachmentRemove />
        </Attachment>
      ))}
    </Attachments>
  );
};

const models = [
  { id: "gpt-4o", name: "GPT-4o" }
];

const InputDemo = () => {
  const [text, setText] = useState<string>("");
  const [model, setModel] = useState<string>(models[0].id);
  const [useWebSearch, setUseWebSearch] = useState<boolean>(false);

  const { messages, status, sendMessage } = useChat();

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    sendMessage(
      {
        text: message.text || "Sent with attachments",
        files: message.files,
      },
      {
        body: {
          model: model,
          webSearch: useWebSearch,
        },
      }
    );
    setText("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full rounded-lg h-[calc(100vh-80px)]">
      <div className="flex flex-col h-full">
        <Conversation>
          <ConversationContent>
            {messages.map((message) => (
              <Message from={message.role} key={message.id}>
                <MessageContent>
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <MessageResponse key={`${message.id}-${i}`}>
                            {part.text}
                          </MessageResponse>
                        );
                      default:
                        return null;
                    }
                  })}
                </MessageContent>
              </Message>
            ))}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <PromptInput
          onSubmit={handleSubmit}
          className="mt-4"
          globalDrop
          multiple
        >
          <PromptInputHeader>
            <PromptInputAttachmentsDisplay />
          </PromptInputHeader>
          <PromptInputBody>
            <PromptInputTextarea
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputActionMenu>
                <PromptInputActionMenuTrigger />
                <PromptInputActionMenuContent>
                  <PromptInputActionAddAttachments />
                  {/* <PromptInputActionAddScreenshot /> */}
                </PromptInputActionMenuContent>
              </PromptInputActionMenu>
              {/* <PromptInputButton
                onClick={() => setUseWebSearch(!useWebSearch)}
                tooltip={{ content: "Search the web", shortcut: "⌘K" }}
                variant={useWebSearch ? "default" : "ghost"}
              >
                <GlobeIcon size={16} />
                <span>Search</span>
              </PromptInputButton> */}
              <PromptInputSelect
                onValueChange={(value) => {
                  setModel(value);
                }}
                value={model}
              >
                <PromptInputSelectTrigger>
                  <PromptInputSelectValue />
                </PromptInputSelectTrigger>
                <PromptInputSelectContent>
                  {models.map((model) => (
                    <PromptInputSelectItem key={model.id} value={model.id}>
                      {model.name}
                    </PromptInputSelectItem>
                  ))}
                </PromptInputSelectContent>
              </PromptInputSelect>
            </PromptInputTools>
            <PromptInputSubmit disabled={!text && !status} status={status} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
};

export default InputDemo;
