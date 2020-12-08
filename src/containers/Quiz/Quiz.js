import React from 'react';
import classes from './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz.js';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz.js';

class Quiz extends React.Component {
	state = {
		results: {}, // {[id]: success error}
		isFinished: false,
		activeQuistion: 0,
		answerState: null, // {[id]: 'success' 'error'}
		quiz: [
			{
				question: 'Какого цвета небо?',
				rightAnswerId: 2,
				id: 1,
				answers: [
					{text: 'Черный', id: 1},
					{text: 'Синий', id: 2},
					{text: 'Красный', id: 3},
					{text: 'Зеленый', id: 4}
				]
			},
			{
				question: 'В каком году основали Санкт-Петербург?',
				rightAnswerId: 3,
				id: 2,
				answers: [
					{text: '1700', id: 1},
					{text: '1702', id: 2},
					{text: '1703', id: 3},
					{text: '1803', id: 4}
				]
			}
		]
	}

	// Функция которая будет выполняться когда мы будем нажимать на вариант ответа
	// Данную функцию необходимо передать в ActiveQuiz
	onAnswerClickHandler = answerId => {

		// Выход из функции по условию
		if(this.state.answerState) {
			const key = Object.keys(this.state.answerState)[0];
			if(this.state.answerState[key] === 'success') {
				return
			}
		}

		// текущий вопрос
		const question = this.state.quiz[this.state.activeQuistion];
		const results = this.state.results;

		// Проверяем правильно ли ответили
		// Если правильно, то через 1 секунду показываем следующий вопрос
		// Если не правильно, то ничего не делаем
		// Проверяем
		if(question.rightAnswerId === answerId) {
			if(!results[question.id]) {
				results[question.id] = 'success'
			}

			this.setState({
				answerState: {[answerId]: 'success'},
				results
			})

			const timeout = window.setTimeout(() => {
				if(this.isQuizFinished()) {
					this.setState({
						isFinished: true
					});
				} else {
					this.setState({
						activeQuistion: this.state.activeQuistion + 1,
						answerState: null 
					});
				}
				window.clearTimeout(timeout);
			}, 500)
			// ответили неправильно
		} else {
			results[question.id] = 'error'
			this.setState({
				answerState: {[answerId]: 'error'},
				results
			})
		}
	}


	isQuizFinished() {
		// возвращаем true если выражение верно, иначе ничего не делаем
		return this.state.activeQuistion + 1 === this.state.quiz.length;
	}

	// стрелочная функция чтобы не терять контекст
	// переводим state в изначальное состояние
	retryHandler = () => {
		this.setState({
			activeQuistion: 0,
			answerState: null,
			isFinished: false,
			results: {}
		})
	}

	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>Ответьте на все вопросы</h1>
					
					{
						this.state.isFinished
						  ? <FinishedQuiz 
						  		results={this.state.results}
						  		quiz={this.state.quiz}
						  		onRetry={this.retryHandler}
						  	/>
						  : <ActiveQuiz 
									question={this.state.quiz[this.state.activeQuistion].question}
									answers={this.state.quiz[this.state.activeQuistion].answers}
									onAnswerClick={this.onAnswerClickHandler}
									quizLength={this.state.quiz.length}
									answerNumber={this.state.activeQuistion + 1}
									state={this.state.answerState}
							/>
					}


				</div>
			</div>
		)
	}
}

export default Quiz;