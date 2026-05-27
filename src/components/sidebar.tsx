import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { MessageSquare, PenSquare } from "lucide-react"

const chats = [
  { id: "1", title: "RAG chatbot setup", group: "Today" },
  { id: "2", title: "Next.js project structure", group: "Today" },
  { id: "3", title: "Tailwind v4 config", group: "Yesterday" },
  { id: "4", title: "LangChain document loader", group: "Yesterday" },
];

const groups = [...new Set(chats.map((c) => c.group))];

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between px-2 py-1">
          <span className="font-semibold text-sm">My Chatbot</span>
        </div>
        <div>
          <button className="p-1 rounded hover:bg-sidebar-accent">
            <PenSquare size={15} />
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group}>
            <SidebarGroupLabel>{group}</SidebarGroupLabel>
            <SidebarMenu>
              {chats
                .filter((c) => c.group === group)
                .map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <SidebarMenuButton asChild>
                      <a href={`/chat/${chat.id}`}>
                        <MessageSquare size={13} />
                        <span>{chat.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-medium">
            C
          </div>
          <span className="text-sm font-medium">Canice</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar