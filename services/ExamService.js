let _singleton = Symbol();
const EXAM_API_URL = 'http://localhost:8080/api/exam';
const LESSON_EXAM_URL="http://localhost:8080/api/lesson/{LID}/exam";

export default class ExamService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ExamService(_singleton);
        return this[_singleton]
    }

    findAllExamsForLesson(lessonId) {
        return fetch(
            LESSON_EXAM_URL
                .replace('LID', lessonId))
            .then(function (response) {
                return response.json();
            })
    }

    findExamById(examId) {
        return fetch(
            EXAM_API_URL + '/' + examId)
            .then(function (response) {
                return response.json();
            })
    }

    createExam(lessonId, exam) {
        return fetch(LESSON_EXAM_URL.replace('LID', lessonId),
            {
                body: JSON.stringify(exam),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    deleteExam(examId) {
        return fetch(LESSON_EXAM_URL + '/' + examId,
            {
                method: 'DELETE'
            })
    }

    createEssayQuestion(examId, essay) {
        return fetch(LESSON_EXAM_URL + '/' + examId,
            {
                body: JSON.stringify(essay),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    createMultipleChoiceQuestion(examId, multipleChoice) {
        return fetch(LESSON_EXAM_URL + '/' + examId,
            {
                body: JSON.stringify(multipleChoice),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    createFillInBlank(examId, fillIn) {
        return fetch(LESSON_EXAM_URL + '/' + examId,
            {
                body: JSON.stringify(fillIn),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    createTrueFalseQuestion(examId, trueFalse) {
        return fetch(LESSON_EXAM_URL + '/' + examId,
            {
                body: JSON.stringify(trueFalse),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }
}