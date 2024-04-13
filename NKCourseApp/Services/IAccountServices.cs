using NKCourseApp.Models;
using NKCourseApp.Repository.Entities;

namespace NKCourseApp.Services
{
    public interface IAccountServices
    {
       public Task<Candidate?> LoginValidation(login login);
    }
}
