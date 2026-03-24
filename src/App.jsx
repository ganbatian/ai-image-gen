import React, { useState } from 'react'
import { Sparkles, Wand2, Palette, Download, Copy, Loader2, Image, ArrowRight, Layers, Zap } from 'lucide-react'

const stylePresets = [
  { id: 'realistic', name: '写实', emoji: '📷', desc: '照片级真实感' },
  { id: 'anime', name: '动漫', emoji: '🎨', desc: '二次元风格' },
  { id: 'oil', name: '油画', emoji: '🖼️', desc: '艺术油画质感' },
  { id: '3d', name: '3D渲染', emoji: '🎮', desc: '3D渲染效果' },
  { id: 'sketch', name: '素描', emoji: '✏️', desc: '手绘素描风格' },
  { id: 'cyber', name: '赛博朋克', emoji: '🌃', desc: '未来科技感' },
]

const aspectRatios = [
  { id: '1:1', label: '1:1', icon: '◼️' },
  { id: '16:9', label: '16:9', icon: '▬' },
  { id: '9:16', label: '9:16', icon: '▮' },
  { id: '4:3', label: '4:3', icon: '▢' },
]

function App() {
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('low quality, blurry, distorted')
  const [selectedStyle, setSelectedStyle] = useState('realistic')
  const [aspectRatio, setAspectRatio] = useState('1:1')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState([])
  const [copied, setCopied] = useState(false)

  const generateImage = async () => {
    if (!prompt.trim()) return
    setIsGenerating(true)
    
    // 模拟生成过程
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 生成示例图片（使用占位图）
    const newImage = {
      id: Date.now(),
      url: `https://picsum.photos/seed/${Date.now()}/512/512`,
      prompt,
      style: selectedStyle,
      time: new Date().toLocaleTimeString()
    }
    setGeneratedImages(prev => [newImage, ...prev])
    setIsGenerating(false)
  }

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Wand2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">AI Image Generator</h1>
                <p className="text-sm text-white/60">智能图片生成器</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Free Credits: 50</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Generate Area */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            描述你的图片
          </h2>
          
          {/* Prompt Input */}
          <div className="mb-6">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="输入图片描述，例如：一只在星空下奔跑的白色柯基犬，超写实风格..."
              className="w-full h-32 bg-black/30 border border-white/10 rounded-2xl p-4 text-white placeholder-white/40 resize-none outline-none focus:border-purple-500 transition-colors"
            />
            <div className="flex justify-end mt-2">
              <button onClick={copyPrompt} className="text-white/40 text-sm hover:text-white flex items-center gap-1">
                <Copy className="w-4 h-4" />
                {copied ? '已复制!' : '复制'}
              </button>
            </div>
          </div>

          {/* Negative Prompt */}
          <div className="mb-6">
            <label className="text-white/60 text-sm mb-2 block">反向提示词 (可选)</label>
            <input
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Style Presets */}
          <div className="mb-6">
            <label className="text-white/60 text-sm mb-3 block flex items-center gap-2">
              <Palette className="w-4 h-4" /> 风格选择
            </label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {stylePresets.map(style => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    selectedStyle === style.id 
                      ? 'bg-purple-500 border-2 border-purple-400' 
                      : 'bg-white/5 border border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="text-2xl mb-1">{style.emoji}</div>
                  <div className="text-white text-sm font-medium">{style.name}</div>
                  <div className="text-white/40 text-xs">{style.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio */}
          <div className="mb-8">
            <label className="text-white/60 text-sm mb-3 block">图片比例</label>
            <div className="flex gap-2">
              {aspectRatios.map(ratio => (
                <button
                  key={ratio.id}
                  onClick={() => setAspectRatio(ratio.id)}
                  className={`px-4 py-2 rounded-xl text-white text-sm transition-all ${
                    aspectRatio === ratio.id 
                      ? 'bg-purple-500' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {ratio.icon} {ratio.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateImage}
            disabled={!prompt.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <Wand2 className="w-6 h-6" />
                开始生成
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {/* Generated Images */}
        {generatedImages.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Image className="w-5 h-5 text-purple-400" />
              已生成的图片 ({generatedImages.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedImages.map(img => (
                <div key={img.id} className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10">
                  <img src={img.url} alt={img.prompt} className="w-full aspect-square object-cover" />
                  <div className="p-4">
                    <p className="text-white text-sm mb-2 line-clamp-2">{img.prompt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/40 text-xs">{img.time}</span>
                      <div className="flex gap-2">
                        <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                          <Download className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {generatedImages.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Layers className="w-12 h-12 text-white/20" />
            </div>
            <p className="text-white/40 text-lg">输入描述，开始创作你的图片</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
