using NKCourseApp.Models;
using NKCourseApp.Repository.Entities;
using NKCourseApp.Repository;
using Microsoft.EntityFrameworkCore;

namespace NKCourseApp.Services
{
    public class ProfileServices : IProfileServices
    {
        NKCourseDB courseApp = new NKCourseDB();
        public async Task<ProfileModel?> GetProfileInfo(string emailid)
        {

            var query = (from c in courseApp.Candidates
                         join r in courseApp.Roles on c.Roleid equals r.Id
                         where c.EmailId == emailid 
                         select new ProfileModel 
                         {
                             Id= c.Id,
                             EmailId= c.EmailId,
                             Active= c.Active,
                             FirstName= c.FirstName,
                             LastName= c.LastName,
                             PhoneNumber= c.PhoneNumber,
                             Roleid= c.Roleid,
                             RoleName= r.Name
                         });
            var candidate = await query.FirstOrDefaultAsync();
            if (candidate != null)
                return candidate;
            return null;
        }



    }
}
