"use client"

import { useState, Fragment } from "react";
import { useChat } from "@ai-sdk/react";
import {
  PromptInput,
  PromptInputBody,
  PromptInputButton,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  // PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
// import { Response } from "@/components/ai-elements/response";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Loader } from "lucide-react";
// import { Loader } from "@components/ai-elements/loader";

export default function RAGChatBot() {

  const [input, setInput] = useState("")
  const{ messages, sendMessage, status } = useChat()

  const handleSubmit = (message: PromptInputMessage) => {
    if (!message.text) return;
    sendMessage({ text: message.text });
    setInput("");
  };
  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full h-[cal(100vh]">
      <div className="flex flex-col h-full">
        <Conversation className="h-full">
          <ConversationContent>
            {
              messages.map((message) => (
                <div key={message.id}>
                  {message.parts.map((part, i) => {
                    switch(part.type) {
                      case "text":
                        return (
                          <Fragment key={`${message.id}-${i}`}>
                            <Message from={message.role}>
                              <MessageContent>
                                <Response>
                                  {part.text}
                                </Response>
                              </MessageContent>
                            </Message>
                        </Fragment>
                        );

                      default:
                        return null;
                    }
                  })}
                </div>
              ))
            }
            {(status === "submitted" || status === "streaming") && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <PromptInput onSubmit={handleSubmit} className="mt-4">
          <PromptInputBody>
            <PromptInputTextarea value={input} onChange={(e) => setInput(e.target.value)} />
          </PromptInputBody>
          <PromptInputTools>
            {/* Moddel selector, web search etc */}
          </PromptInputTools>
          <PromptInputSubmit />
        </PromptInput>


      </div>
    </div>
  )
}