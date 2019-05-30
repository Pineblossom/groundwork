/*
 * @Author: mikey.changlei
 * @Date: 2019-03-21 09:33:14
 * @Last Modified by: zhao.changlei
 * @Last Modified time: 2019-03-21 10:44:14
 */

import { Component, ComponentFactoryResolver, OnInit, OnChanges } from '@angular/core';
import { TargetLocator } from 'selenium-webdriver';

const todos = [
  {
    id: 1,
    title: '吃饭',
    status: true
  },
  {
    id: 2,
    title: '睡觉',
    status: false
  },
  {
    id: 3,
    title: '打豆豆',
    status: false
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// tslint:disable-next-line:class-name

export class AppComponent implements OnInit {
  public todos: {   // todos列表
    id: number,
    title: string,
    status: boolean,
  }[] = JSON.parse(window.localStorage.getItem('todos'));
  public currentEditing: {    // 编辑项列表
    id: number,
    title: string,
    status: boolean
  } = null;
  public visibility = 'all';    // hash标识
  /**
   * 添加新的todo
   * @param e 点击事件
   */
  addTodo(e) {
    console.log(e.target.value);
    const titleText = e.target.value;
    if (!titleText.length) {
      return ;
    }
    const last = this.todos.length;
    this.todos.push({
      id: last ? this.todos.length + 1 : 1,
      title: titleText,
      status: false
    });
    console.log(this.todos);
    e.target.value = '';
  }
  /**
   * 这是Angular中的一个特殊的生命周期钩子函数
   * 它会在应用初始化的时候执行一次
   */
  ngOnInit() {
    // 获取路由名
    this.hashChangeHandler();
    window.onhashchange = this.hashChangeHandler.bind(this);
  }
  // 这是Angular中的一个特殊的生命周期钩子函数
  // 它会在组件变量改变的时候执行一次
  // tslint:disable-next-line:use-life-cycle-interface
  ngDoCheck(): void {
    window.localStorage.setItem('todos', JSON.stringify(this.todos));
    console.log(window.localStorage.todos);
  }
  //  获取过滤后的todos
  get filterTodos() {
    if (this.visibility === 'all') {
      return this.todos;
    } else if (this.visibility === 'active') {
      return this.todos.filter(t => !t.status);
    } else if (this.visibility === 'completed') {
      return this.todos.filter(t => t.status);
    }
  }
  get toggleAll(): boolean {
    return this.todos.every(t => t.status);
  }
  set toggleAll(val) {
    this.todos.forEach(t => t.status = val);
  }
  delTodo(index: number): void {
    this.todos.splice(index, 1);
  }
  saveTodo(todo, e) {
    todo.title = e.target.value;
    this.currentEditing = null;
  }
  handleEditKeyup(e) {
    console.log(e);
    const {target} = e;
    console.log(target);
    if (e.keyCode === 27) {     // esc === 27
      target.value = this.currentEditing.title;
      this.currentEditing = null;
    }
  }
  get remainingCount() {
    return this.todos.filter(t => !t.status).length;
  }
  clearAllDone() {
    this.todos = this.todos.filter(t => !t.status);
  }
  // 获取页面的标签值
  hashChangeHandler() {
    const hash = window.location.hash.substr(1);
    switch (hash) {
      case '/': this.visibility = 'all'; break;
      case '/active': this.visibility = 'active'; break;
      case '/completed': this.visibility = 'completed'; break;
      default:
        break;
    }
  }
}
