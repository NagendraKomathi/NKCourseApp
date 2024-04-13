using Microsoft.EntityFrameworkCore;
using NKCourseApp.Models;
using NKCourseApp.Repository;
using NKCourseApp.Repository.Entities;

namespace NKCourseApp.Services
{
    public class AccountServices : IAccountServices
    {
        NKCourseDB courseApp = new NKCourseDB();
        public async Task<Candidate?> LoginValidation(login login)
        {
            var candidate = await courseApp.Candidates.FirstOrDefaultAsync(x => x.EmailId == login.EmailId && x.Password == login.Password && x.Roleid == 1);
            if (candidate != null)            
                return candidate;
            return null;
        }
    }
}
