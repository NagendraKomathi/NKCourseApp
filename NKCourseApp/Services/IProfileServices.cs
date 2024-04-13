using NKCourseApp.Models;
using NKCourseApp.Repository.Entities;

namespace NKCourseApp.Services
{
    public interface IProfileServices
    {
        public Task<ProfileModel?> GetProfileInfo(string emailid);
    }
}
