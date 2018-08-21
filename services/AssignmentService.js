let _singleton = Symbol();
const ASSIGNMENT_API_URL = 'http://localhost:8080/api/assignment';
const LESSON_ASSIGNMENT_URL="http://localhost:8080/api/lesson/{LID}/assignment";

class AssignmentService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new AssignmentService(_singleton);
        return this[_singleton]
    }


    findAssignmentById(assignmentId) {
        return fetch(
            ASSIGNMENT_API_URL + '/' + assignmentId)
            .then(function (response) {
                return response.json();
            })
    }

    findAllAssignmentsForLesson(lessonId) {
        return fetch(
            LESSON_ASSIGNMENT_URL.replace('LID', lessonId))
            .then(function (response) {
                return response.json();
            })
    }

    createAssignment(lessonId, assignment) {
        return fetch(LESSON_ASSIGNMENT_URL.replace('LID', lessonId),
            {
                body: JSON.stringify(assignment),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    deleteAssignment(assignmentId) {
        return fetch(ASSIGNMENT_API_URL + '/' + assignmentId,
            {
                method: 'DELETE'
            })
    }
}
export default AssignmentService;