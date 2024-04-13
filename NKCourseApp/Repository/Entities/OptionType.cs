using System;
using System.Collections.Generic;

namespace NKCourseApp.Repository.Entities
{
    public partial class OptionType
    {
        public int Id { get; set; }
        public string? Type { get; set; }
        public string? Options { get; set; }
    }
}
