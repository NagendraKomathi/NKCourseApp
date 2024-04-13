using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NKCourseApp.Models;
using NKCourseApp.Repository.Entities;
using NKCourseApp.Services;

namespace NKCourseApp.Controllers
{
    [Route("api/[controller]")]
    public class QuestionController : ControllerBase
    {
        private readonly IQuestionServices _services;
        public QuestionController(IQuestionServices questionServices)
        {
            _services = questionServices;
        }

        [Route("GetAllTopics")]
        [HttpGet]
        public async Task<IActionResult> GetAllTopics()
        {
            var topics = await _services.GetAllTopics();

            if (topics != null)
                return Ok(topics);

            return Ok("Error");
        }

        [Route("GetAllTopicsWithTest")]
        [HttpGet]
        public async Task<IActionResult> GetAllTopicsWithTest()
        {
            var topics = await _services.GetAllTopicsWithTest();

            if (topics != null)
                return Ok(topics);

            return Ok("Error");
        }

        [Route("GetQuestionCount")]
        [HttpGet]
        public async Task<IActionResult> GetQuestionCount(int selectedTopic, int selectedTest)
        {
            var TotalTest = await _services.GetQuestionCount(selectedTopic, selectedTest);

            if (TotalTest != 0)
                return Ok(TotalTest);

            return Ok("Error");
        }
        

        [Route("SaveQuestion")]
        [HttpPost]
        public async Task<IActionResult> SaveQuestion([FromBody] Models.AddTopic model, int SelectedTest)
        {
            try
            {
                if (model == null)
                    return BadRequest("Invalid client request");

                Repository.Entities.AddTopic topics = new Repository.Entities.AddTopic()
                {
                    Id = model.Id,
                    OptionType = model.OptionType,
                    Question = model.Question,
                    TopicId = Convert.ToInt32(model.TopicId)
                };
                var user = await _services.AddTopics(topics, model.options, SelectedTest);
                if (user == null)
                    return NotFound(new { Message = "User Not Found!" });

                return Ok(new
                {
                    Message = "Success"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [Route("GetQuestion")]
        [HttpGet]
        public async Task<IActionResult> GetQuestion(string selectedTopic, int QuestionNo)
        {
            try
            {
                var questions = await _services.GetQuestion(selectedTopic,QuestionNo);

                if (questions == null)
                    return Ok(questions);

                return Ok(questions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [Route("DeleteQuestion")]
        [HttpGet]
        public async Task<IActionResult> DeleteQuestion(int QuestionNo, int topicId)
        {
            try
            {
                var questions = await _services.DeleteQuestion(QuestionNo);

                if (questions == null)
                    return Ok(questions);

                return Ok(questions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [Route("UpdateQuestion")]
        [HttpPost]
        public async Task<IActionResult> UpdateQuestion([FromBody] Models.AddTopic model)
        {
            try
            {
                if (model == null)
                    return BadRequest("Invalid client request");

                Repository.Entities.AddTopic topics = new Repository.Entities.AddTopic()
                {
                    Id = model.Id,
                    OptionType = model.OptionType,
                    Question = model.Question,
                    TopicId = Convert.ToInt32(model.TopicId)
                };
                var user = await _services.UpdateTopics(topics, model.options);
                if (user == null)
                    return Ok("Error");

                return Ok(new
                {
                    Message = "Success"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
