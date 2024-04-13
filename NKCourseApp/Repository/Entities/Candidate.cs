using System;
using System.Collections.Generic;

namespace NKCourseApp.Repository.Entities
{
    public partial class Candidate
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? EmailId { get; set; }
        public int? Roleid { get; set; }
        public bool? Active { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Password { get; set; }
        public string? Address { get; set; }
        public string? Mobile { get; set; }
    }
}
