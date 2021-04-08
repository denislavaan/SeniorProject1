using System;

namespace API.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string SenderUsername { get; set; }
        public AppUser Sender { get; set; }
        public int ReceiverId { get; set; }
        public string ReceiverUsername { get; set; }
        public AppUser Receiver { get; set; }
        public string Content { get; set; }
        public DateTime? DateRead { get; set; } //adding ? so that it can be null if the message is not read
        public DateTime MessageSent { get; set; } = DateTime.Now;
        public bool SenderDeleted { get; set; }
        public bool ReceiverDeleted { get; set; }
    }
}