using System;
using System.Collections.Generic;

namespace NKCourseApp.Repository.Entities
{
    public partial class Option
    {
        public int Id { get; set; }
        public int? AddTopicId { get; set; }
        public string? QueOption { get; set; }
        public bool? Answer { get; set; }
    }
}
