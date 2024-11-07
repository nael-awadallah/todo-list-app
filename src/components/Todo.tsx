/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import { Check, Plus, Trash2, Cloud, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import WeatherWidget from './WeatherWidget';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('todos');
    setTodos([]);
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="min-h-screen p-4 flex flex-col items-center">
      <Card className="w-full max-w-xl bg-[#1C1A27] border-none shadow-2xl">
        <CardContent className="p-6">
          <WeatherWidget />
          <div className="flex justify-between items-center mt-6 mb-6">
            <h1 className="text-2xl font-bold text-white">TO-DO NOW</h1>
            <Button
              onClick={clearLocalStorage}
              variant="outline"
              size="icon"
              className="bg-transparent border-[#6C5DD3] text-[#6C5DD3] hover:bg-[#6C5DD3] hover:text-white"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          <form onSubmit={addTodo} className="flex gap-2 mb-6">
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
              className="flex-1 bg-[#282533] border-[#9e78cf54] text-white placeholder:text-gray-500 focus:border-gray-600"
              required
            />
            <Button
              type="submit"
              size="icon"
              className="bg-[#6C5DD3] hover:bg-[#5B4EC2]"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </form>

          {activeTodos.length > 0 && (
            <div className="mb-6">
              <div className="text-sm text-gray-400 mb-3">
                Tasks to do - {activeTodos.length}
              </div>
              <div className="space-y-2">
                {activeTodos.map((todo, index) => (
                  <div
                    key={todo.id}
                    className="flex items-center justify-between p-3 bg-[#282533] rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className="h-5 w-5 rounded border border-[#6C5DD3] flex items-center justify-center hover:bg-[#6C5DD3]/20"
                      >
                        <Check className="h-4 flex-none w-5 text-[#6d5dd32c]" />
                      </button>
                      <span className="text-[#6C5DD3] flex-auto font-semibold">
                        <span className="text-[#6C5DD3] text-sm	">
                          {++index}.{' '}
                        </span>
                        {todo.text}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {completedTodos.length > 0 && (
            <div className="mb-6">
              <div className="text-sm text-gray-400 mb-3">
                Done - {completedTodos.length}
              </div>
              <div className="space-y-2">
                {completedTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center justify-between p-3 bg-[#282533] rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className="h-5 w-5 rounded bg-green-700 flex items-center justify-center"
                      >
                        <Check className="h-4 w-4 text-white" />
                      </button>
                      <span className="text-green-500 line-through">
                        {todo.text}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* <div className="mt-6 bg-[#6C5DD3]/20 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Cloud className="h-6 w-6 text-white" />
                <div className="text-white">
                  <div>Cloudy</div>
                  <div className="text-sm text-gray-400">Monday</div>
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">20°</div>
                <div className="text-sm text-gray-400 text-right">68.9°F</div>
              </div>
            </div>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
