using NKCourseApp.Models;
using NKCourseApp.Repository.Entities;

namespace NKCourseApp.Services
{
    public interface IQuestionServices
    {
        public Task<List<Repository.Entities.Topic>> GetAllTopics();
        public Task<List<TempTopics>> GetAllTopicsWithTest();
        
        public Task<string> AddTopics(Repository.Entities.AddTopic addTopic, QueOption[]? options, int selectedTest);
        public Task<string> UpdateTopics(Repository.Entities.AddTopic addTopic, QueOption[]? options);
        public Task<string> DeleteQuestion(int QuestionNo);
        public Task<ListOfQuestions> GetQuestion(string selectedTopic, int QuestionNo);
        public Task<int> GetQuestionCount(int selectedTopic, int selectedTest);
        
    }
}
