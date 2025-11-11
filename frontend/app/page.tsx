"use client";

import { useState, useEffect } from "react";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [summarizingId, setSummarizingId] = useState<string | null>(null);
  const [summaries, setSummaries] = useState<{ [key: string]: string }>({});

  const backendUrl = "http://localhost:3001";

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${backendUrl}/notes`);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const createNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        setTitle("");
        setContent("");
        fetchNotes();
      }
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAISummary = async (noteId: string, content: string) => {
    setSummarizingId(noteId);
    try {
      const response = await fetch(`${backendUrl}/ai-summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: content }),
      });

      const data = await response.json();

      // Store the summary in state to display it inline
      setSummaries((prev) => ({
        ...prev,
        [noteId]: data.summary,
      }));
    } catch (error) {
      console.error("Error getting AI summary:", error);
      // Optionally show an error message to the user
      setSummaries((prev) => ({
        ...prev,
        [noteId]: "Error generating summary",
      }));
    } finally {
      setSummarizingId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Notes App</h1>

      {/* Create Note Form */}
      <form
        onSubmit={createNote}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Create New Note</h2>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter note title"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter note content"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
        >
          {loading ? "Creating..." : "Create Note"}
        </button>
      </form>

      {/* Notes List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Your Notes ({notes.length})
        </h2>

        {notes.length === 0 ? (
          <p className="text-gray-500">
            No notes yet. Create your first note above!
          </p>
        ) : (
          <div className="space-y-6">
            {notes.map((note) => (
              <div
                key={note.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h3 className="font-semibold text-lg text-gray-800">
                  {note.title}
                </h3>
                <p className="text-gray-600 mt-2">{note.content}</p>

                {/* AI Summary Section - Only show if summary exists */}
                {summaries[note.id] && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-md">
                    <h4 className="font-medium text-blue-800 mb-1">
                      AI Summary:
                    </h4>
                    <p className="text-blue-700">{summaries[note.id]}</p>
                  </div>
                )}

                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(note.createdAt).toLocaleString()}
                  </span>
                  <button
                    onClick={() => getAISummary(note.id, note.content)}
                    disabled={summarizingId === note.id}
                    className="bg-green-500 text-white px-4 py-1 rounded text-sm hover:bg-green-600 disabled:bg-green-300"
                  >
                    {summarizingId === note.id
                      ? "Summarizing..."
                      : summaries[note.id]
                      ? "Summary Generated"
                      : "Get AI Summary"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
