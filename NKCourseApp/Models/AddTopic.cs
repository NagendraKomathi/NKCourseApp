namespace NKCourseApp.Models
{
    public class AddTopic
    {
        public int Id { get; set; }
        public string? TopicId { get; set; }
        public string? Question { get; set; }
        public int? OptionType { get; set; }
        public QueOption[]? options { get; set;}
    }
}
