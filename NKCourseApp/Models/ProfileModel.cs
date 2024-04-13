using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NKCourseApp.Models
{
    public class ProfileModel
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? EmailId { get; set; }
        public int? Roleid { get; set; }
        public bool? Active { get; set; }
        public string? PhoneNumber { get; set; }
        public string? RoleName { get; set; }

    }
}
