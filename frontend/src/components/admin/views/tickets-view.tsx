import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { AdminViewContext } from "./types";

export function TicketsView({ ctx }: { ctx: AdminViewContext }) {
  const {
    ticketStatus,
    setTicketStatus,
    ticketPriority,
    setTicketPriority,
    filteredTickets,
    ticketPriorityClass,
    updateTicketStatus,
    dt,
    replyTicket,
    ticketReply,
    setTicketReply,
  } = ctx;

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>Support Tickets</CardTitle>
          <CardDescription>Status, priority and attachment tracking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Select value={ticketStatus} onValueChange={(value) => setTicketStatus(value as any)}>
                <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-6">
              <Select value={ticketPriority} onValueChange={(value) => setTicketPriority(value as any)}>
                <SelectTrigger><SelectValue placeholder="Priority" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Attachments</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket: any) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.subject}</TableCell>
                  <TableCell>{ticket.userName}</TableCell>
                  <TableCell><Badge className={cn("border capitalize", ticketPriorityClass[ticket.priority])}>{ticket.priority}</Badge></TableCell>
                  <TableCell>
                    <Select value={ticket.status} onValueChange={(value) => updateTicketStatus(ticket.id, value as any)}>
                      <SelectTrigger className="h-8 w-[150px]"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in_progress">In progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{ticket.attachments}</TableCell>
                  <TableCell>{dt(ticket.updatedAt)}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => replyTicket(ticket.id)}>Reply</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reply Composer</CardTitle>
          <CardDescription>Send update to selected ticket thread</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea value={ticketReply} onChange={(e) => setTicketReply(e.target.value)} placeholder="Type your reply to the user..." rows={8} />
        </CardContent>
      </Card>
    </div>
  );
}
