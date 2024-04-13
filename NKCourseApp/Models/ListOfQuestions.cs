namespace NKCourseApp.Models
{
    public class ListOfQuestions
    {
        public int Id { get; set; }
        public string? TopicId { get; set; }
        public string? Question { get; set; }
        public int? OptionType { get; set; }
        public List<QueOption>? Options { get; set; }
        public string? Title { get; set; }
        public int? AddTopicId { get; set; }
        public string? QueOption { get; set; }
        public string? Type { get; set; }
        public string? Option { get; set; }
    }
}
