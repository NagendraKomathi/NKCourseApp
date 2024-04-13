using Microsoft.EntityFrameworkCore;
using NKCourseApp.Models;
using NKCourseApp.Repository;
using NKCourseApp.Repository.Entities;
using System.Linq;
using System.Security.Cryptography.Xml;

namespace NKCourseApp.Services
{
    public class QuestionServices : IQuestionServices
    {
        NKCourseDBContext courseApp = new NKCourseDBContext();
        public async Task<List<Repository.Entities.Topic>> GetAllTopics()
        {
            var query = courseApp.Topics;
            return await query.ToListAsync();
        }
        public async Task<List<TempTopics>> GetAllTopicsWithTest()
        {
            var query = (from at in courseApp.AddTopics
                         join t in courseApp.Tests on at.Test equals t.Id
                         join tp in courseApp.Topics on at.TopicId equals tp.Id
                         select new TopicTest()
                         {
                             TopicId = tp.Id,
                             TestId = t.Id,
                             Test = t.Test1,
                             Title = tp.Title
                         });

            var data = query.ToList();

            var topics =  data.Select(x=>x.Title).Distinct().ToList();
            List<TempTopics> tempTopics = new List<TempTopics>();
            TempTopics tempTopic = new TempTopics();
            int count = 0;
            topics.ForEach(x =>
            {
                tempTopic.title = x;
                var testList = data.Where(t => t.Title == x).Select(t => new { t.Test , t.TestId } ).Distinct().ToList();
                List<Models.Test> tests = new List<Models.Test>();
               
                testList.ForEach(te =>
                {
                    tests.Add(new Models.Test {  Id = te.TestId , Name = te.Test });
                    
                });
                tempTopic.Test = tests;
                tempTopic.IsShow = (count == 0) ? "show" : "";
                count++;
                tempTopics.Add(new TempTopics { Test = tempTopic.Test , title = tempTopic.title,  });
            });

            tempTopics[0].IsShow = "Show";



            return tempTopics;
        }
        
        public async Task<string> AddTopics(Repository.Entities.AddTopic addTopic, QueOption[]? options, int selectedTest)
        {
            int count = 0;

            var topicNo = courseApp.AddTopics.Where(x => x.TopicId == addTopic.TopicId && x.Test == selectedTest).Select(x => x.TopicOrder).OrderBy(x => x).Max();
            if(topicNo != null)
            {
                addTopic.TopicOrder = Convert.ToInt32(topicNo) + 1;
            }
            else
            {
                addTopic.TopicOrder = 1;
            }
            addTopic.Test = selectedTest;
            courseApp.AddTopics.Add(addTopic);
            courseApp.SaveChanges();
            var id = addTopic.Id;

            if(options?.Length != 0 && addTopic.OptionType != 3)
            {
                foreach (var option in options)
                {
                    var opt = new Option();
                    opt.AddTopicId = id;
                    opt.QueOption = option.option;
                    opt.Answer = option.answer;
                    courseApp.Options.Add(opt);
                    courseApp.SaveChanges();
                }
            }
            else
            {
                var opt = new Option();
                opt.AddTopicId = id;
                opt.QueOption = null;
                courseApp.Options.Add(opt);
                courseApp.SaveChanges();
            }

            string result = string.Empty;
            await Task.Run(() =>
            {
                result = "Success";
            });
            return result;
        }
        public async Task<string> UpdateTopics(Repository.Entities.AddTopic addTopic, QueOption[]? options)
        {
            var exitData = courseApp.AddTopics.Find(addTopic.Id);
            if (exitData != null)
            {
                exitData.TopicId = addTopic.TopicId;
                exitData.Question = addTopic.Question;
                exitData.OptionType = addTopic.OptionType;
                courseApp.SaveChanges();
            }

            var id = addTopic.Id;

            var optionList = courseApp.Options.Where(x => x.AddTopicId == addTopic.Id).Select(x=>x.Id).ToList();

            if (options?.Length != 0 && addTopic.OptionType != 3)
            {
                var optionCount = 0;
                foreach (var option in options)
                {
                   // var optId = courseApp.Options.Where(x => x.AddTopicId == addTopic.Id && x.QueOption == option).FirstOrDefault()?.Id;
                    var opt = courseApp.Options.Find(optionList[optionCount]);
                    opt.AddTopicId = id;
                    opt.QueOption = option.option;
                    opt.Answer = option.answer;
                    //courseApp.Options.Add(opt);
                    courseApp.SaveChanges();
                    optionCount++;
                }
            }
            else
            {

                var opt = new Option();
                opt.AddTopicId = id;
                opt.QueOption = null;
                //courseApp.Options.Add(opt);
                courseApp.SaveChanges();
            }

            string result = string.Empty;
            await Task.Run(() =>
            {
                result = "Success";
            });
            return result;
        }
        public async Task<ListOfQuestions> GetQuestion(string selectedTopic,int QuestionNo)
        {
            var addTopic = courseApp.AddTopics.Where(x => x.TopicId == Convert.ToInt32(selectedTopic) && x.TopicOrder == QuestionNo).FirstOrDefault()?.Id;
            var option = courseApp.Options.Where(x => x.AddTopicId == addTopic).Select(x => new { x.QueOption, x.Answer }).ToList();
            List<QueOption> queOptions = new List<QueOption>();
            if (option != null)
            {
                for (int i =0; i < option.Count; i++)
                {
                    QueOption queOption = new QueOption();
                    queOption.option = option[i].QueOption;
                    queOption.answer = option[i].Answer;
                    queOptions.Add(queOption);
                }
            }

            var query = (from at in courseApp.AddTopics
                         join tp in courseApp.Topics on at.TopicId equals tp.Id
                         join ot in courseApp.OptionTypes on at.OptionType equals ot.Id
                         join op in courseApp.Options on at.Id equals op.AddTopicId
                         where tp.Id == Convert.ToInt32(selectedTopic) && at.TopicOrder == QuestionNo
                         select new ListOfQuestions
                         {
                             TopicId = at.TopicId.ToString(),
                             Question = at.Question,
                             OptionType = at.OptionType,
                             Title = tp.Title,
                             Type = ot.Type,
                             Options = queOptions,
                             QueOption = op.QueOption

                         });

            return await query.FirstOrDefaultAsync();
        }
        public async Task<string> DeleteQuestion(int QuestionNo)
        {
            try
            {
                var addTopic = courseApp.AddTopics.Where(x => x.Id == QuestionNo).FirstOrDefault();
                if (addTopic != null)
                {
                    courseApp.AddTopics.Remove(addTopic);
                    courseApp.SaveChanges();
                }
                var option = courseApp.Options.Where(x => x.AddTopicId == QuestionNo).ToList();
                foreach (var opt in option)
                {
                    courseApp.Options.Remove(opt);
                    courseApp.SaveChanges();
                }
                string result = string.Empty;
                await Task.Run(() =>
                {
                    result = "Success";
                });
                return "Sucess";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<int> GetQuestionCount(int selectedTopic, int selectedTest)
        {
            var totalQuestions = courseApp.AddTopics.Where(x => x.TopicId == selectedTopic && x.Test == selectedTest).ToList().Count;

            int result = 0;
            await Task.Run(() =>
            {
                result = totalQuestions;
            });
            return result;
        }
    }
}
