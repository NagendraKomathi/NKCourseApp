using System;
using System.Collections.Generic;

namespace NKCourseApp.Repository.Entities
{
    public partial class AddTopic
    {
        public int Id { get; set; }
        public int? TopicId { get; set; }
        public string? Question { get; set; }
        public int? OptionType { get; set; }
        public int? TopicOrder { get; set; }
        public int? Test { get; set; }
    }
}
