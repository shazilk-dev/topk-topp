import { useState } from "react";
import { Brain, Dice1, Target, Sparkles, ChevronRight } from "lucide-react";

export default function TopKTopPGuide() {
  const [activeTab, setActiveTab] = useState("basics");
  const [topK, setTopK] = useState(5);
  const [topP, setTopP] = useState(0.9);

  const exampleTokens = [
    { word: "Paris", prob: 0.4 },
    { word: "a", prob: 0.2 },
    { word: "known", prob: 0.15 },
    { word: "the", prob: 0.1 },
    { word: "Lyon", prob: 0.08 },
    { word: "capital", prob: 0.03 },
    { word: "France", prob: 0.02 },
    { word: "beautiful", prob: 0.01 },
    { word: "city", prob: 0.01 },
  ];

  // const getTopKTokens = () => {
  //   return exampleTokens.slice(0, topK);
  // };

  // const getTopPTokens = () => {
  //   let cumulative = 0;
  //   const result = [];
  //   for (const token of exampleTokens) {
  //     cumulative += token.prob;
  //     result.push(token);
  //     if (cumulative >= topP) break;
  //   }
  //   return result;
  // };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center gap-3">
          <Brain className="text-blue-600" size={40} />
          Understanding Top-K & Top-P
        </h1>
        <p className="text-lg text-gray-600">
          Learn how AI models choose the next word (and why it matters!)
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {[
          { id: "basics", label: "🧠 The Basics", icon: Brain },
          { id: "topk", label: "🎯 Top-K", icon: Target },
          { id: "topp", label: "💫 Top-P", icon: Sparkles },
          { id: "philosophy", label: "🔬 Philosophy", icon: Dice1 },
          { id: "practice", label: "⚡ Use Cases", icon: ChevronRight },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-lg transform scale-105"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {activeTab === "basics" && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              How Do LLMs Choose Words?
            </h2>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                Think of it like a restaurant menu! 🍽️
              </h3>
              <p className="text-gray-700 leading-relaxed">
                When you ask an LLM to complete a sentence like{" "}
                <strong>"The capital of France is..."</strong>, the AI doesn't
                just have one answer. It has THOUSANDS of possible next words,
                each with a probability.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Example: Word Probabilities
              </h3>
              <div className="space-y-2">
                {exampleTokens.map((token, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="font-mono text-lg w-24">{token.word}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-6 rounded-full transition-all"
                        style={{ width: `${token.prob * 100}%` }}
                      />
                      <span className="absolute right-2 top-0 text-sm font-semibold text-gray-700">
                        {(token.prob * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-400 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-yellow-900 mb-2">
                The Problem 🤔
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                If we always pick the HIGHEST probability word (greedy
                sampling), the AI becomes boring and repetitive.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If we pick RANDOMLY from ALL words, the AI says nonsense like
                "The capital of France is bicycle."
              </p>
            </div>

            <div className="bg-green-50 border-2 border-green-400 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-green-900 mb-2">
                The Solution ✨
              </h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>Top-K and Top-P are filtering strategies</strong> that
                help the AI pick from the "smart middle ground" - words that are
                likely enough to make sense, but diverse enough to be
                interesting!
              </p>
            </div>
          </div>
        )}

        {activeTab === "topk" && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <Target className="text-blue-600" />
              Top-K Sampling: Fixed Number Filter
            </h2>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                The Simple Idea
              </h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>
                  Top-K = "Only consider the top K most likely words"
                </strong>
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                It's like going to a restaurant and saying: "Show me only the
                top 5 most popular dishes, and I'll randomly pick one from those
                5."
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Interactive Example
              </h3>
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Set K value: {topK}
                </label>
                <input
                  type="range"
                  min="1"
                  max="9"
                  value={topK}
                  onChange={(e) => setTopK(parseInt(e.target.value))}
                  className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-3">
                  Words the AI can choose from (K={topK}):
                </h4>
                <div className="space-y-2">
                  {exampleTokens.map((token, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                        idx < topK
                          ? "bg-green-100 border-2 border-green-400"
                          : "bg-gray-100 opacity-50"
                      }`}
                    >
                      <span className="font-mono text-lg w-24 font-semibold">
                        {token.word}
                      </span>
                      <span className="text-gray-600">
                        {(token.prob * 100).toFixed(1)}%
                      </span>
                      {idx < topK && (
                        <span className="ml-auto text-green-700 font-bold">
                          ✓ Available
                        </span>
                      )}
                      {idx >= topK && (
                        <span className="ml-auto text-gray-500">
                          ✗ Filtered Out
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 border-2 border-green-400 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-green-900 mb-2">
                  ✅ Pros
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    Simple and predictable
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    Reduces nonsense outputs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    Easy to understand and control
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 border-2 border-red-400 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-red-900 mb-2">❌ Cons</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    Not adaptive - always picks K words
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    Can be too restrictive or too permissive
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    Doesn't account for confidence level
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "topp" && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <Sparkles className="text-purple-600" />
              Top-P Sampling: Dynamic Probability Filter
            </h2>

            <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-purple-900 mb-2">
                The Smart Idea
              </h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>
                  Top-P = "Include words until their probabilities add up to P%"
                </strong>
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                Also called <strong>"Nucleus Sampling"</strong> - it adapts
                based on the model's confidence!
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Interactive Example
              </h3>
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Set P value: {topP} ({(topP * 100).toFixed(0)}%)
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={topP}
                  onChange={(e) => setTopP(parseFloat(e.target.value))}
                  className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-3">
                  Words included (cumulative probability ≥{" "}
                  {(topP * 100).toFixed(0)}%):
                </h4>
                <div className="space-y-2">
                  {exampleTokens.map((token, idx) => {
                    const cumulative = exampleTokens
                      .slice(0, idx + 1)
                      .reduce((sum, t) => sum + t.prob, 0);
                    const isIncluded = cumulative <= topP || idx === 0;

                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                          isIncluded
                            ? "bg-purple-100 border-2 border-purple-400"
                            : "bg-gray-100 opacity-50"
                        }`}
                      >
                        <span className="font-mono text-lg w-24 font-semibold">
                          {token.word}
                        </span>
                        <span className="text-gray-600">
                          {(token.prob * 100).toFixed(1)}%
                        </span>
                        <span className="text-sm text-gray-500">
                          (Total: {(cumulative * 100).toFixed(1)}%)
                        </span>
                        {isIncluded && (
                          <span className="ml-auto text-purple-700 font-bold">
                            ✓ Included
                          </span>
                        )}
                        {!isIncluded && (
                          <span className="ml-auto text-gray-500">
                            ✗ Excluded
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Notice:</strong> The number of words included changes
                  based on the probability distribution! When the model is
                  confident (high probabilities), fewer words are needed. When
                  uncertain (spread out probabilities), more words are included.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 border-2 border-green-400 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-green-900 mb-2">
                  ✅ Pros
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    Adapts to model's confidence
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    More contextually appropriate
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    Widely used in practice (0.9-0.95)
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-400 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-yellow-900 mb-2">
                  ⚠️ Considerations
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    Slightly more complex than Top-K
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    Still benefits from Temperature tuning
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "philosophy" && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              🔬 The Philosophy Behind It
            </h2>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-300 p-6 rounded-xl">
              <h3 className="text-2xl font-bold text-indigo-900 mb-4">
                The Core Problem: Entropy Control
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>Entropy</strong> is a measure of unpredictability or
                randomness. In language generation:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <strong>High entropy:</strong> Many words have similar
                  probabilities → unpredictable, creative
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <strong>Low entropy:</strong> Few words dominate →
                  predictable, focused
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border-2 border-blue-400 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  Top-K Philosophy
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>"Democracy with a limit"</strong>
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Give everyone in the top K a chance, no matter how the votes
                  are distributed. It's fair but doesn't care about context.
                </p>
              </div>

              <div className="bg-purple-50 border-2 border-purple-400 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-purple-900 mb-3">
                  Top-P Philosophy
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>"Adaptive democracy"</strong>
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Include voices until you capture the "core consensus." When
                  there's clear agreement, few voices matter. When opinions are
                  split, include more perspectives.
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-300 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Real-World Analogy 🎬
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-2">
                    Scenario 1: "What's 2+2?"
                  </h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Model is VERY confident: "4" has 99% probability
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>
                      <strong>Top-K (K=5):</strong> Still considers 5 words
                      (including nonsense)
                    </li>
                    <li>
                      <strong>Top-P (P=0.9):</strong> Only considers "4" ✓
                      Better!
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-bold text-purple-900 mb-2">
                    Scenario 2: "Write a creative story about..."
                  </h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Model is uncertain: Many words have 5-10% probability each
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>
                      <strong>Top-K (K=5):</strong> Only 5 words (too limiting)
                    </li>
                    <li>
                      <strong>Top-P (P=0.9):</strong> Considers 15-20 words ✓
                      Better!
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-400 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-green-900 mb-3">
                How They Work Together With Temperature
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                The typical pipeline in modern LLMs:
              </p>
              <div className="bg-white p-4 rounded-lg space-y-2">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    1
                  </div>
                  <p className="text-gray-700">
                    Model generates raw probabilities (logits)
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    2
                  </div>
                  <p className="text-gray-700">
                    <strong>Temperature</strong> is applied (adjusts the spread)
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    3
                  </div>
                  <p className="text-gray-700">
                    <strong>Top-K or Top-P</strong> filters the options
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    4
                  </div>
                  <p className="text-gray-700">
                    Random sampling from filtered options
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "practice" && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              ⚡ Practical Use Cases
            </h2>

            <div className="space-y-4">
              {[
                {
                  title: "📊 Data Extraction & Analysis",
                  color: "blue",
                  temp: "0.1-0.3",
                  topk: "1-5",
                  topp: "0.1-0.5",
                  why: "Need highly predictable, factual outputs. Low randomness ensures consistency.",
                },
                {
                  title: "💻 Code Generation",
                  color: "green",
                  temp: "0.2-0.5",
                  topk: "10-20",
                  topp: "0.7-0.85",
                  why: "Balance between correctness and exploring different solutions. Still needs to be logical.",
                },
                {
                  title: "✍️ General Writing & Q&A",
                  color: "purple",
                  temp: "0.7",
                  topk: "40-50",
                  topp: "0.9",
                  why: "Standard balanced approach. Natural-sounding but still coherent. Most common use case.",
                },
                {
                  title: "🎨 Creative Writing & Brainstorming",
                  color: "pink",
                  temp: "0.8-1.2",
                  topk: "50-100",
                  topp: "0.95",
                  why: "Maximum creativity and diversity. Willing to take risks with unusual word choices.",
                },
                {
                  title: "🔍 Fact-Based Research",
                  color: "indigo",
                  temp: "0.3",
                  topk: "5-10",
                  topp: "0.5-0.7",
                  why: "Prioritize accuracy over creativity. Reduce hallucinations.",
                },
              ].map((useCase, idx) => (
                <div
                  key={idx}
                  className={`bg-${useCase.color}-50 border-2 border-${useCase.color}-400 p-6 rounded-xl`}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {useCase.title}
                  </h3>
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Temperature</p>
                      <p className="text-lg font-bold text-gray-800">
                        {useCase.temp}
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Top-K</p>
                      <p className="text-lg font-bold text-gray-800">
                        {useCase.topk}
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Top-P</p>
                      <p className="text-lg font-bold text-gray-800">
                        {useCase.topp}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong>Why:</strong> {useCase.why}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-yellow-900 mb-3">
                🎯 Pro Tips
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 text-xl">1.</span>
                  <div>
                    <strong>Start with Top-P (0.9) + Temperature (0.7)</strong>{" "}
                    - This is the "safe default" that works well for most tasks
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 text-xl">2.</span>
                  <div>
                    <strong>Use Top-P alone in modern systems</strong> - It's
                    more adaptive than Top-K. Many recent systems default to
                    Top-P only
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 text-xl">3.</span>
                  <div>
                    <strong>Lower Temperature first</strong> - If outputs are
                    too random, reduce Temperature before touching Top-K/Top-P
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 text-xl">4.</span>
                  <div>
                    <strong>For critical tasks</strong> - Use Temperature near 0
                    and Top-P around 0.1-0.3 to maximize consistency
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 text-xl">5.</span>
                  <div>
                    <strong>Experiment!</strong> - These are starting points.
                    The best settings depend on your specific use case
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 border-2 border-red-400 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-red-900 mb-3">
                ⚠️ Common Mistakes
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">❌</span>
                  Setting Temperature too high (&gt;1.5) → Incoherent gibberish
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">❌</span>
                  Using Top-K=1 (greedy) for creative tasks → Boring, repetitive
                  output
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">❌</span>
                  Combining high Temperature + high Top-P → Too unpredictable
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">❌</span>
                  Using same settings for all tasks → One size doesn't fit all
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">❌</span>
                  Ignoring the context → Factual tasks need different settings
                  than creative ones
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-400 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-teal-900 mb-3">
                🚀 Modern Trends (2024-2025)
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 text-xl">•</span>
                  <div>
                    <strong>Top-P is winning:</strong> Most production systems
                    now default to Top-P (nucleus sampling) instead of Top-K
                    because it's more adaptive
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 text-xl">•</span>
                  <div>
                    <strong>Hybrid approaches:</strong> Some systems use both
                    Top-K and Top-P together (apply Top-K first, then Top-P) for
                    better control
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 text-xl">•</span>
                  <div>
                    <strong>Dynamic sampling:</strong> Research into
                    automatically adjusting these parameters based on the task
                    and context
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 text-xl">•</span>
                  <div>
                    <strong>Min-P sampling:</strong> A newer alternative that
                    sets a minimum probability threshold relative to the top
                    choice (still experimental)
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Quick Reference Card */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl shadow-xl p-8 mt-6">
        <h3 className="text-2xl font-bold mb-4">📋 Quick Reference</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-bold text-blue-300 mb-2">Top-K</h4>
            <p className="text-sm text-gray-300 mb-2">
              "Consider only the top K most likely words"
            </p>
            <p className="text-xs text-gray-400">
              Fixed number, simple, but not adaptive to context
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-purple-300 mb-2">
              Top-P (Nucleus)
            </h4>
            <p className="text-sm text-gray-300 mb-2">
              "Include words until probabilities sum to P%"
            </p>
            <p className="text-xs text-gray-400">
              Dynamic, adaptive, generally preferred in practice
            </p>
          </div>
        </div>
        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-300">
            <strong>Remember:</strong> These work TOGETHER with Temperature.
            Temperature shapes the probability distribution, while Top-K/Top-P
            filter which options to consider. Most modern systems use
            <strong className="text-yellow-300"> Temperature + Top-P</strong> as
            the default combination.
          </p>
        </div>
      </div>
    </div>
  );
}
