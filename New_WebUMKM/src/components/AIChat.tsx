import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import mammoth from 'mammoth';
import { Sale, Purchase, Finance } from '../lib/mockData';

// --- TYPES ---
type ChatMessage = {
    id: string;
    sender: 'user' | 'bot';
    text: string;
    image?: string | null;
    timestamp: number;
};

type ChatSession = {
    id: string | number;
    title: string;
    messages: ChatMessage[];
};

type InventoryItem = {
    id: string | number;
    name: string;
    stock: number;
    price: number;
};

type RadarData = {
    hasData: boolean;
    totalRevenue?: number;
    totalProfit?: number;
    topProduct?: string;
    dailySales?: any[];
    rawData?: any[];
};

type FileAttachment = {
    name: string;
    content: string;
};

interface AIChatProps {
    inventoryData: InventoryItem[];
    radarData: RadarData;
    sales: Sale[];
    purchases: Purchase[];
    finances: Finance[];
    currentSession: ChatSession | null;
    onSendMessage: (text: string, sender: 'user' | 'bot', image?: string | null) => void;
    sessions: ChatSession[];
}

// --- ICONS ---
interface IconProps { size?: number; className?: string; }

const IconBot: React.FC<IconProps> = ({ size = 20, className = "" }) => <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>;
const IconSend: React.FC<IconProps> = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>;
const IconLoader: React.FC<IconProps> = () => <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>;
const IconPaperclipAI: React.FC<IconProps> = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>;
const IconImageAI: React.FC<IconProps> = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>;
const IconXAI: React.FC<IconProps> = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
const IconPlusAI: React.FC<IconProps> = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconFile: React.FC<IconProps> = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>;
const IconZoom: React.FC<IconProps> = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>;
const IconCopy: React.FC<IconProps> = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>;
const IconReply: React.FC<IconProps> = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>;
const IconInfo: React.FC<IconProps> = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>;

// --- MAIN COMPONENT ---
export const AIChat: React.FC<AIChatProps> = ({
    inventoryData,
    radarData,
    sales,
    purchases,
    finances,
    currentSession,
    onSendMessage,
    sessions,
}) => {
    // 🔧 CONFIG
    const API_KEY = "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";
    const BASE_URL = "https://api.groq.com/openai/v1";
    const MODEL_NAME = "meta-llama/llama-4-scout-17b-16e-instruct";

    // STATE
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    
    const [pendingImage, setPendingImage] = useState<string | null>(null);
    const [pendingFile, setPendingFile] = useState<FileAttachment | null>(null);
    const [fileStatus, setFileStatus] = useState<string>("");

    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [toast, setToast] = useState<{ show: boolean, message: string }>({ show: false, message: "" });

    // VIEWER
    const [viewImage, setViewImage] = useState<string | null>(null);
    const [zoomLevel, setZoomLevel] = useState<number>(1);
    const [panPosition, setPanPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [dragStart, setDragStart] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    
    // REFS
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const photoInputRef = useRef<HTMLInputElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const plusButtonRef = useRef<HTMLButtonElement>(null);
    
    const inputKey = currentSession?.id ? `input-${currentSession.id}` : `input-fallback-${Date.now()}`;

    // SCROLL
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [currentSession?.messages, isLoading, pendingImage, pendingFile, replyingTo]);

    // CLOSE MENU WHEN CLICKING OUTSIDE
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isMenuOpen && 
                menuRef.current && 
                !menuRef.current.contains(event.target as Node) &&
                plusButtonRef.current && 
                !plusButtonRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    // TOAST HELPER
    const showNotification = (msg: string) => {
        setToast({ show: true, message: msg });
        setTimeout(() => setToast({ show: false, message: "" }), 3000);
    };

    // RESET STATE
    useEffect(() => {
        setInput("");
        setIsLoading(false);
        setPendingImage(null);
        setPendingFile(null);
        setReplyingTo(null);
        setFileStatus("");
        setTimeout(() => inputRef.current?.focus(), 100);
    }, [currentSession?.id]);

    // --- FILE HANDLING ---
    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'file') => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        e.target.value = '';
        
        setIsMenuOpen(false);

        if (type === 'image') {
            const reader = new FileReader();
            reader.onload = (evt) => { setPendingImage(evt.target?.result as string); setPendingFile(null); };
            reader.readAsDataURL(file);
        } else {
            setFileStatus("Membaca file...");
            const isExcel = file.name.endsWith(".xlsx") || file.name.endsWith(".xls");
            const isDocx = file.name.endsWith(".docx");
            const isPdf = file.name.endsWith(".pdf");
            const isText = file.type === "text/plain" || file.name.endsWith(".csv") || file.name.endsWith(".json");
            
            if (isExcel) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    try {
                        const data = new Uint8Array(evt.target?.result as ArrayBuffer);
                        const workbook = XLSX.read(data, {type: 'array'});
                        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                        const csvContent = XLSX.utils.sheet_to_csv(worksheet);
                        setPendingFile({ name: file.name, content: csvContent });
                        setPendingImage(null); setFileStatus("");
                    } catch(e) { showNotification("❌ Gagal baca Excel"); setFileStatus(""); }
                };
                reader.readAsArrayBuffer(file);
            } 
            else if (isDocx) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    mammoth.extractRawText({ arrayBuffer: evt.target?.result as ArrayBuffer })
                        .then(result => { setPendingFile({ name: file.name, content: result.value }); setPendingImage(null); setFileStatus(""); })
                        .catch(() => { showNotification("❌ Gagal baca Word"); setFileStatus(""); });
                };
                reader.readAsArrayBuffer(file);
            }
            else if (isPdf) {
                showNotification("⚠️ PDF tidak didukung. Silakan konversi ke teks atau unggah sebagai gambar.");
                setFileStatus("");
            }
            else if (isText) {
                const reader = new FileReader();
                reader.onload = (evt) => { setPendingFile({ name: file.name, content: evt.target?.result as string }); setPendingImage(null); setFileStatus(""); };
                reader.readAsText(file);
            } else { showNotification("⚠️ Format file tidak didukung."); setFileStatus(""); }
        }
    };

    // --- API CALL ---
    const callGroqAPI = async (userQuestion: string, imageData: string | null = null, textFileData: FileAttachment | null = null) => {
        const limitedExcelData = radarData.hasData && radarData.rawData ? radarData.rawData.slice(0, 50) : [];
        const excelContext = radarData.hasData ? `User has Excel Data. Top 50 rows: ${JSON.stringify(limitedExcelData)}. Total Revenue: ${radarData.totalRevenue}.` : "No Excel data yet.";
        
        let messagesPayload: any[] = [];

        const systemPrompt = `
            ROLE: 'AutoUMKM AI Consultant'.
            [CONTEXT] Inventory: ${JSON.stringify(inventoryData)}, Sales: ${JSON.stringify(sales)}, Purchases: ${JSON.stringify(purchases)}, Finances: ${JSON.stringify(finances)}, Profit Radar: ${excelContext}
            Answer strictly about business.
        `;
        messagesPayload.push({ role: "system", content: systemPrompt });

        const recentMessages = currentSession?.messages.slice(-6) || [];
        recentMessages.forEach(msg => {
            let cleanText = msg.text.replace(/^\|\|QUOTE\|\|.*?\|\|END\|\|/s, "").replace(/^> .*?\n\n/s, "").trim();
            messagesPayload.push({
                role: msg.sender === 'user' ? "user" : "assistant",
                content: typeof cleanText === 'string' ? cleanText : "[Attachment]"
            });
        });

        let finalUserContent = userQuestion;
        if (textFileData) {
            const contentSnippet = textFileData.content.length > 20000 
                ? textFileData.content.substring(0, 20000) + "... [Truncated]" 
                : textFileData.content;
            finalUserContent = `[Attached file: ${textFileData.name}]\n\n=== CONTENT ===\n${contentSnippet}\n=== END ===\n\nQUESTION:\n${userQuestion}`;
        }

        if (imageData) {
            messagesPayload.push({
                role: "user",
                content: [
                    { type: "text", text: finalUserContent || "Analisa gambar ini." },
                    { type: "image_url", image_url: { url: imageData } }
                ]
            });
        } else {
            messagesPayload.push({ role: "user", content: finalUserContent });
        }

        try {
            const response = await fetch(`${BASE_URL}/chat/completions`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${API_KEY}` },
                body: JSON.stringify({ model: MODEL_NAME, messages: messagesPayload, temperature: 0.3, max_tokens: 1500, stream: false })
            });
            const data = await response.json();
            if (data.error) return `⚠️ Groq Error: ${data.error.message}`;
            return data.choices[0].message.content || "⚠️ No response.";
        } catch (error: any) { return `⚠️ Koneksi Gagal: ${error.message}`; }
    };

    const handleSend = async () => {
        if(!input.trim() && !pendingImage && !pendingFile) return;
        
        let textToSend = input;
        if (replyingTo) {
            const shortQuote = replyingTo.substring(0, 100) + (replyingTo.length > 100 ? "..." : "");
            textToSend = `> ${shortQuote}\n\n${textToSend}`;
        }

        const imageToSend = pendingImage;
        const fileToSend = pendingFile;

        setInput(""); setPendingImage(null); setPendingFile(null); setReplyingTo(null);
        setIsMenuOpen(false); setIsLoading(true);

        try {
            let displayMsg = textToSend; 
            if (fileToSend) displayMsg = `[File: ${fileToSend.name}]\n${textToSend}`;
            if (imageToSend && input === "") displayMsg = "[Mengirim Gambar...]";

            onSendMessage(displayMsg, 'user', imageToSend);
            const aiReply = await callGroqAPI(textToSend, imageToSend, fileToSend);
            onSendMessage(aiReply, 'bot');
        } catch (error) { onSendMessage("⚠️ System Error.", 'bot'); } 
        finally { setIsLoading(false); setTimeout(() => inputRef.current?.focus(), 100); }
    };

    // --- FORMATTER ---
    const formatMessage = (text: string) => {
        if (!text) return null;
        let quoteContent: string | null = null;
        let mainContent = text;

        if (text.startsWith("> ")) {
            const splitText = text.split("\n\n");
            if (splitText.length > 1) {
                quoteContent = splitText[0].replace("> ", "");
                mainContent = splitText.slice(1).join("\n\n");
            }
        }

        const renderText = (contentStr: string) => {
            return contentStr.split('\n').map((line, index) => {
                const isListItem = /^\s*[\*\-]\s+/.test(line);
                let content = line.replace(/^\s*[\*\-]\s+/, "");
                const parts = content.split(/(\*\*.*?\*\*|\*.*?\*|`[^`]+`)/g);
                const formattedContent = parts.map((part, i) => {
                    if (part.startsWith('`') && part.endsWith('`')) return <code key={i} className="bg-gray-200 text-red-600 px-1 rounded font-mono text-xs">{part.slice(1, -1)}</code>;
                    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="text-cyan-700 font-bold">{part.slice(2, -2)}</strong>;
                    if (part.startsWith('*') && part.endsWith('*')) return <strong key={i} className="text-cyan-700 font-bold">{part.slice(1, -1)}</strong>;
                    return part;
                });
                
                const isArabic = /[\u0600-\u06FF]/.test(content);
                const alignmentClass = isArabic ? "text-right" : "text-left";
                
                if (isListItem) return (<div key={index} className={`flex items-start gap-2 mb-1 pl-2 ${alignmentClass}`}><span className="text-cyan-600 mt-1.5 min-w-[6px]">•</span><div className="text-gray-800">{formattedContent}</div></div>);
                else return (<div key={index} className={`${line.trim() === "" ? "h-2" : `mb-1 text-gray-800 ${alignmentClass}`}`}>{formattedContent}</div>);
            });
        };

        return (
            <div>
                {quoteContent && (
                    <div className="mb-2 p-2 bg-gray-100 border-l-4 border-cyan-500 rounded-r rounded-b-md text-xs text-gray-600 italic opacity-90 select-none overflow-hidden relative">
                        <div className="font-bold text-cyan-600 not-italic text-[10px] uppercase mb-1">Membalas:</div>
                        <div className="line-clamp-3 text-ellipsis">{quoteContent}</div>
                    </div>
                )}
                {renderText(mainContent)}
            </div>
        );
    };

    const handleCopyText = (text: string) => { navigator.clipboard.writeText(text); showNotification("Teks berhasil disalin!"); };
    const handleReplyText = (text: string) => {
        let cleanText = text.replace(/^\|\|QUOTE\|\|.*?\|\|END\|\|/s, "").replace(/^> .*?\n\n/s, "").trim();
        setReplyingTo(cleanText); setTimeout(() => inputRef.current?.focus(), 50);
    };
    const cancelReply = () => setReplyingTo(null);

    // FILE INPUT HANDLERS
    const triggerFileInput = (type: 'file' | 'image') => {
        if (type === 'file') {
            fileInputRef.current?.click();
        } else {
            photoInputRef.current?.click();
        }
        setIsMenuOpen(false);
    };

    // TOGGLE MENU
    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };

    if (!currentSession) return <div className="text-gray-500 flex items-center justify-center h-full">Memuat Chat...</div>;

    return (
        <div className="animate-fade-in flex flex-col h-[calc(100vh-80px)] bg-white rounded-lg shadow-sm border border-gray-200">
            {/* HEADER */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <div className="flex items-center gap-2">
                    <div className="text-cyan-600"><IconBot /></div>
                    <h2 className="text-xl font-bold text-gray-800">AI Consultant</h2>
                </div>
            </div>
            
            {/* TOAST NOTIF */}
            {toast.show && (
                <div className="fixed bottom-12 inset-x-0 flex justify-center z-50 pointer-events-none">
                    <div className="bg-cyan-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg animate-fade-up flex items-center gap-2 pointer-events-auto">
                        <IconInfo /> {toast.message}
                    </div>
                </div>
            )}

            {/* CHAT MESSAGES */}
            <div className="flex-1 bg-white p-4 overflow-y-auto mb-4 flex flex-col space-y-4">
                {currentSession.messages.map(m => (
                    <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`group relative max-w-[85%] p-4 rounded-lg text-sm leading-relaxed ${m.sender === 'user' ? 'bg-cyan-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 border border-gray-200 rounded-bl-none'}`}>
                            {m.image && (
                                <div className="mb-3 rounded-lg overflow-hidden border border-gray-300 relative group cursor-pointer" onClick={() => { setViewImage(m.image || null); setZoomLevel(1); }}>
                                    <img src={m.image} alt="Uploaded content" className="w-full max-h-60 object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                        <div className="text-white text-xs bg-black/70 px-2 py-1 rounded flex items-center gap-1"><IconZoom /> Perbesar</div>
                                    </div>
                                </div>
                            )}
                            
                            <div className={m.sender === 'user' ? 'text-white' : 'text-gray-800'}>
                                {m.sender === 'user' ? m.text : formatMessage(m.text)}
                            </div>

                            {m.sender === 'bot' && (
                                <div className="absolute -bottom-8 left-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                                    <button onClick={() => handleCopyText(m.text)} className="p-1.5 bg-white border border-gray-300 rounded-full text-gray-500 hover:text-cyan-600 shadow-sm"><IconCopy /></button>
                                    <button onClick={() => handleReplyText(m.text)} className="p-1.5 bg-white border border-gray-300 rounded-full text-gray-500 hover:text-cyan-600 shadow-sm"><IconReply /></button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && <div className="text-cyan-600 text-sm flex items-center gap-2 p-2"><IconLoader /> Mengetik...</div>} 
                <div ref={messagesEndRef} />
            </div>

            {/* INPUT AREA */}
            <div className="border-t border-gray-200 bg-white p-4">
                {/* Pending Attachments */}
                {(pendingImage || pendingFile) && (
                    <div className="mb-3 p-3 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {pendingImage && (
                                <>
                                    <IconImageAI />
                                    <span className="text-sm text-gray-700">Gambar siap dikirim</span>
                                </>
                            )}
                            {pendingFile && (
                                <>
                                    <IconFile />
                                    <span className="text-sm text-gray-700">{pendingFile.name}</span>
                                </>
                            )}
                        </div>
                        <button 
                            onClick={() => { setPendingImage(null); setPendingFile(null); }}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <IconXAI />
                        </button>
                    </div>
                )}

                {/* Reply Preview */}
                {replyingTo && (
                    <div className="mb-3 p-2 bg-cyan-50 border border-cyan-200 rounded-2xl flex justify-between items-start">
                        <div className="flex-1">
                            <div className="text-xs font-bold text-cyan-700 mb-1">Membalas:</div>
                            <div className="text-sm text-cyan-800 line-clamp-2">{replyingTo}</div>
                        </div>
                        <button 
                            onClick={cancelReply}
                            className="text-cyan-500 hover:text-cyan-700 transition-colors ml-2"
                        >
                            <IconXAI />
                        </button>
                    </div>
                )}

                <div className="flex gap-2 items-end relative">
                    {/* Hidden File Inputs */}
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={(e) => handleFileSelect(e, 'file')} 
                        className="absolute opacity-0 w-0 h-0" 
                        accept=".docx,.xlsx,.xls,.csv,.txt,.json"
                        style={{ display: 'none' }}
                    />
                    <input 
                        type="file" 
                        ref={photoInputRef} 
                        onChange={(e) => handleFileSelect(e, 'image')} 
                        accept="image/*" 
                        className="absolute opacity-0 w-0 h-0"
                        style={{ display: 'none' }}
                    />

                    {/* Upload Menu Popup */}
                    {isMenuOpen && (
                        <div ref={menuRef} className="absolute bottom-full left-0 mb-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden animate-fade-in z-20">
                            <div className="p-1">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); triggerFileInput('file'); }} 
                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-cyan-600 transition rounded-lg text-sm text-left"
                                >
                                    <div className="p-1.5 bg-gray-100 rounded text-cyan-600"><IconPaperclipAI /></div>
                                    <div>
                                        <p className="font-bold">Upload File</p>
                                        <p className="text-[10px] text-gray-400">DOCX, CSV, XLSX, TXT</p>
                                    </div>
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); triggerFileInput('image'); }} 
                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-cyan-600 transition rounded-lg text-sm text-left mt-1"
                                >
                                    <div className="p-1.5 bg-gray-100 rounded text-cyan-600"><IconImageAI /></div>
                                    <div>
                                        <p className="font-bold">Upload Foto</p>
                                        <p className="text-[10px] text-gray-400">JPG, PNG, WEBP</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Plus Button */}
                    <button 
                        ref={plusButtonRef}
                        onClick={toggleMenu} 
                        className={`p-3 rounded-2xl transition-all duration-200 flex-shrink-0 self-end ${isMenuOpen ? 'bg-cyan-600 text-white rotate-45 shadow-md' : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-800'}`}
                    >
                        <IconPlusAI />
                    </button>
                    
                    {/* Text Area */}
                    <textarea
                        key={inputKey} 
                        ref={inputRef} 
                        rows={1}
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        onKeyDown={(e) => { if (e.key === 'Enter' && !isLoading && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                        placeholder="Ketik pesan..." 
                        autoFocus={true} 
                        autoComplete="off"
                        className="flex-1 bg-white text-gray-900 border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 resize-none overflow-y-auto min-h-[52px] h-[52px] max-h-[120px] placeholder-gray-400 text-[15px] leading-[1.4]" 
                    />
                    
                    {/* Send Button */}
                    <button 
                        onClick={(e) => { e.stopPropagation(); handleSend(); }} 
                        disabled={isLoading || (!input.trim() && !pendingImage && !pendingFile)} 
                        className="p-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-2xl font-bold transition shadow-sm self-end flex-shrink-0"
                    >
                        <IconSend />
                    </button>
                </div>
            </div>
        </div>
    )
};

export default AIChat;