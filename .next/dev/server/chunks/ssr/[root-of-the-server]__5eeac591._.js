module.exports = [
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/sahil/Duzaro_webadmin/app/api/api.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BASE_URL",
    ()=>BASE_URL,
    "CATEGORY",
    ()=>CATEGORY,
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "IMAGE_BASE_URL",
    ()=>IMAGE_BASE_URL,
    "LOGIN",
    ()=>LOGIN,
    "PATCH",
    ()=>PATCH,
    "POST",
    ()=>POST,
    "PROVIDER",
    ()=>PROVIDER,
    "PUT",
    ()=>PUT,
    "SERVICES",
    ()=>SERVICES,
    "UPLOAD",
    ()=>UPLOAD,
    "USERS",
    ()=>USERS
]);
const BASE_URL = 'http://82.112.231.71:5517';
const IMAGE_BASE_URL = 'http://82.112.231.71:5517';
const POST = 'POST';
const GET = 'GET';
const PUT = 'PUT';
const PATCH = 'PATCH';
const DELETE = 'DELETE';
const UPLOAD = '/user/upload-profile-picture';
const LOGIN = '/admin/login';
const USERS = '/admin/users/list';
const CATEGORY = '/admin/categories';
const SERVICES = '/service';
const PROVIDER = '/providers';
}),
"[project]/sahil/Duzaro_webadmin/app/api/ApiHelper/categoryHelper.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CreateCategory",
    ()=>CreateCategory,
    "DeleteCategory",
    ()=>DeleteCategory,
    "GetCategory",
    ()=>GetCategory,
    "UpdateCategory",
    ()=>UpdateCategory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sahil/Duzaro_webadmin/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$api$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sahil/Duzaro_webadmin/app/api/api.tsx [app-ssr] (ecmascript)");
;
;
const GetCategory = ({ page = 1, limit = 100, search = '', categoryType = 'category' } = {})=>{
    const token = localStorage.getItem('admin_token');
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$api$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BASE_URL"],
        method: __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$api$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GET"],
        url: `${__TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$api$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CATEGORY"]}?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&categoryType=${categoryType}`,
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    });
};
const CreateCategory = (payload)=>{
    const token = localStorage.getItem("admin_token");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$api$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BASE_URL"],
        method: __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$api$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["POST"],
        url: __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$api$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CATEGORY"],
        data: payload,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
const DeleteCategory = (id)=>{
    const token = localStorage.getItem("admin_token");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$api$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BASE_URL"],
        method: __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$api$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DELETE"],
        url: `${__TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$api$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CATEGORY"]}/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
const UpdateCategory = (id, payload)=>{
    const token = localStorage.getItem("admin_token");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$api$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BASE_URL"],
        method: __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$api$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PATCH"],
        url: `${__TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$api$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CATEGORY"]}/${id}`,
        data: payload,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
}),
"[project]/sahil/Duzaro_webadmin/app/api/ApiHelper/uploadHelper.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UploadProviderLogo",
    ()=>UploadProviderLogo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sahil/Duzaro_webadmin/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$api$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sahil/Duzaro_webadmin/app/api/api.tsx [app-ssr] (ecmascript)");
;
;
const UploadProviderLogo = (file)=>{
    const formData = new FormData();
    formData.append("file", file);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$api$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BASE_URL"],
        method: __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$api$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["POST"],
        url: __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$api$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UPLOAD"],
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};
}),
"[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CategoryManagement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sahil/Duzaro_webadmin/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sahil/Duzaro_webadmin/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/sahil/Duzaro_webadmin/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/sahil/Duzaro_webadmin/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/sahil/Duzaro_webadmin/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/sahil/Duzaro_webadmin/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__ = __turbopack_context__.i("[project]/sahil/Duzaro_webadmin/node_modules/lucide-react/dist/esm/icons/pen.js [app-ssr] (ecmascript) <export default as Edit2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/sahil/Duzaro_webadmin/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__ = __turbopack_context__.i("[project]/sahil/Duzaro_webadmin/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-ssr] (ecmascript) <export default as MoreVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/sahil/Duzaro_webadmin/node_modules/lucide-react/dist/esm/icons/image.js [app-ssr] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$ApiHelper$2f$categoryHelper$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sahil/Duzaro_webadmin/app/api/ApiHelper/categoryHelper.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$api$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sahil/Duzaro_webadmin/app/api/api.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$ApiHelper$2f$uploadHelper$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sahil/Duzaro_webadmin/app/api/ApiHelper/uploadHelper.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sahil/Duzaro_webadmin/node_modules/sweetalert2/dist/sweetalert2.esm.all.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function CategoryManagement() {
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [showAddModal, setShowAddModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [categoryName, setCategoryName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [categoryImage, setCategoryImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [openMenuId, setOpenMenuId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [debouncedSearch, setDebouncedSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(searchQuery);
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [totalPages, setTotalPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isEditMode, setIsEditMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const limit = 1000;
    // const categories: Category[] = [
    //   {
    //     id: '1',
    //     name: 'Electricity',
    //     image: '⚡',
    //     servicesCount: 24
    //   },
    //   {
    //     id: '2',
    //     name: 'Water',
    //     image: '💧',
    //     servicesCount: 18
    //   },
    //   {
    //     id: '3',
    //     name: 'Gas',
    //     image: '🔥',
    //     servicesCount: 15
    //   },
    //   {
    //     id: '4',
    //     name: 'Insurance',
    //     image: '🛡️',
    //     servicesCount: 32
    //   },
    //   {
    //     id: '5',
    //     name: 'Telecom',
    //     image: '📱',
    //     servicesCount: 28
    //   },
    //   {
    //     id: '6',
    //     name: 'Internet',
    //     image: '🌐',
    //     servicesCount: 21
    //   },
    //   {
    //     id: '7',
    //     name: 'DTH/Cable',
    //     image: '📺',
    //     servicesCount: 16
    //   },
    //   {
    //     id: '8',
    //     name: 'Loan EMI',
    //     image: '💰',
    //     servicesCount: 42
    //   },
    // ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handler = setTimeout(()=>{
            setDebouncedSearch(searchQuery);
            setPage(1);
        // setBlockedPage(1);
        }, 500);
        return ()=>clearTimeout(handler);
    }, [
        searchQuery
    ]);
    const GetUsersData = async ()=>{
        setIsLoading(true);
        // setUsers([]);
        try {
            const respo = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$ApiHelper$2f$categoryHelper$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GetCategory"])({
                search: debouncedSearch,
                page,
                limit
            });
            setCategories(respo.data.data || []);
            setTotalPages(respo.data.pagination.totalPages || 1);
        } catch (error) {
            console.log(error);
        } finally{
            setIsLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        GetUsersData();
    }, [
        debouncedSearch,
        page
    ]);
    const handleImageUpload = (e)=>{
        const file = e.target.files?.[0];
        if (file) {
            setCategoryImage(file);
        }
    };
    const handleSubmit = async ()=>{
        if (!categoryName || !categoryImage) return;
        try {
            // 1️⃣ Upload image
            const uploadRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$ApiHelper$2f$uploadHelper$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UploadProviderLogo"])(categoryImage);
            const imageUrl = uploadRes.data?.filePath;
            // ⚠️ adjust key if backend returns differently
            if (!imageUrl) {
                alert("Image upload failed");
                return;
            }
            // 2️⃣ Create category
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$ApiHelper$2f$categoryHelper$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CreateCategory"])({
                name: categoryName,
                image: imageUrl,
                isDefault: 'true',
                categoryType: "category"
            });
            // 3️⃣ Reset + close modal
            setCategoryName("");
            setCategoryImage(null);
            setShowAddModal(false);
            // 4️⃣ Refresh list
            GetUsersData();
        } catch (error) {
            console.error("Create category error:", error);
        }
    };
    const handleMenuClick = (categoryId)=>{
        setOpenMenuId(openMenuId === categoryId ? null : categoryId);
    };
    const handleDeleteCategory = async (categoryId)=>{
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire({
            title: "Delete Category?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel"
        });
        if (!result.isConfirmed) return;
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$ApiHelper$2f$categoryHelper$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DeleteCategory"])(categoryId);
            __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire({
                title: "Deleted!",
                text: "Category has been deleted successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
            setOpenMenuId(null);
            GetUsersData();
        } catch (error) {
            console.error("Delete category error:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire({
                title: "Error",
                text: "Failed to delete category.",
                icon: "error"
            });
        }
    };
    const handleEditCategory = (category)=>{
        setIsEditMode(true);
        setSelectedCategory(category);
        setCategoryName(category.name);
        setCategoryImage(null); // image optional on edit
        setShowAddModal(true);
        setOpenMenuId(null);
    };
    const handleUpdateCategory = async ()=>{
        if (!categoryName || !selectedCategory) return;
        try {
            let imageUrl = selectedCategory.image;
            // Upload only if new image selected
            if (categoryImage) {
                const uploadRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$ApiHelper$2f$uploadHelper$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UploadProviderLogo"])(categoryImage);
                imageUrl = uploadRes.data?.filePath;
                if (!imageUrl) {
                    alert("Image upload failed");
                    return;
                }
            }
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$ApiHelper$2f$categoryHelper$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UpdateCategory"])(selectedCategory.id, {
                name: categoryName,
                image: imageUrl
            });
            resetModal();
            GetUsersData();
        } catch (error) {
            console.error("Update category error:", error);
        }
    };
    const resetModal = ()=>{
        setCategoryName("");
        setCategoryImage(null);
        setSelectedCategory(null);
        setIsEditMode(false);
        setShowAddModal(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-8",
        style: {
            fontFamily: 'Montserrat, sans-serif'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold",
                                children: "Category Management"
                            }, void 0, false, {
                                fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                lineNumber: 257,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-600",
                                children: "Manage service categories"
                            }, void 0, false, {
                                fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                lineNumber: 258,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                        lineNumber: 256,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setIsEditMode(false);
                            setSelectedCategory(null);
                            setCategoryName("");
                            setCategoryImage(null);
                            setShowAddModal(true);
                        },
                        className: "flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                lineNumber: 271,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-sm",
                                children: "Add Category"
                            }, void 0, false, {
                                fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                        lineNumber: 261,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                lineNumber: 255,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                            className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                        }, void 0, false, {
                            fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                            lineNumber: 279,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: searchQuery,
                            onChange: (e)=>setSearchQuery(e.target.value),
                            placeholder: "Search categories...",
                            className: "w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC93C]"
                        }, void 0, false, {
                            fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                            lineNumber: 280,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                    lineNumber: 278,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-4 gap-6",
                children: categories.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "col-span-4 flex flex-col items-center justify-center py-20 text-gray-500",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                            className: "w-12 h-12 mb-3"
                        }, void 0, false, {
                            fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                            lineNumber: 294,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg font-semibold",
                            children: "No categories found"
                        }, void 0, false, {
                            fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                            lineNumber: 295,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm",
                            children: "Try changing your search"
                        }, void 0, false, {
                            fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                            lineNumber: 296,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                    lineNumber: 293,
                    columnNumber: 11
                }, this) : categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-4 right-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleMenuClick(category.id),
                                        className: "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__["MoreVertical"], {
                                            className: "w-5 h-5 text-gray-600"
                                        }, void 0, false, {
                                            fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                            lineNumber: 310,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                        lineNumber: 306,
                                        columnNumber: 17
                                    }, this),
                                    openMenuId === category.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "fixed inset-0 z-10",
                                                onClick: ()=>setOpenMenuId(null)
                                            }, void 0, false, {
                                                fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                                lineNumber: 317,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute right-0 top-10 w-40 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleEditCategory(category),
                                                        className: "w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                                                className: "w-4 h-4 text-gray-600"
                                                            }, void 0, false, {
                                                                fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                                                lineNumber: 328,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm font-medium text-gray-700",
                                                                children: "Edit"
                                                            }, void 0, false, {
                                                                fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                                                lineNumber: 329,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                                        lineNumber: 324,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleDeleteCategory(category.id),
                                                        className: "w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                className: "w-4 h-4 text-red-600"
                                                            }, void 0, false, {
                                                                fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                                                lineNumber: 336,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm font-medium text-red-600",
                                                                children: "Delete"
                                                            }, void 0, false, {
                                                                fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                                                lineNumber: 337,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                                        lineNumber: 332,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                                lineNumber: 323,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                lineNumber: 305,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center mb-4",
                                        children: category.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: category.image.startsWith('http') ? category.image : `${__TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$api$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IMAGE_BASE_URL"]}${category.image}`,
                                            alt: category.name,
                                            className: "w-full h-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                            lineNumber: 347,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                            className: "w-10 h-10 text-gray-400"
                                        }, void 0, false, {
                                            fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                            lineNumber: 357,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                        lineNumber: 345,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-lg mb-2",
                                        children: category.name
                                    }, void 0, false, {
                                        fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                        lineNumber: 361,
                                        columnNumber: 17
                                    }, this),
                                    category.servicesCount !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-600",
                                        children: [
                                            category.servicesCount,
                                            " Services"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                        lineNumber: 364,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                lineNumber: 344,
                                columnNumber: 15
                            }, this)
                        ]
                    }, category.id, true, {
                        fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                        lineNumber: 300,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                lineNumber: 291,
                columnNumber: 7
            }, this),
            showAddModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-bold",
                                    children: isEditMode ? "Edit Category" : "Add New Category"
                                }, void 0, false, {
                                    fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                    lineNumber: 381,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowAddModal(false);
                                        setCategoryName('');
                                        setCategoryImage(null);
                                    },
                                    className: "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                        lineNumber: 390,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                    lineNumber: 382,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                            lineNumber: 380,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold mb-2",
                                            children: "Category Image"
                                        }, void 0, false, {
                                            fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                            lineNumber: 399,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-2 border-dashed border-gray-300 rounded-xl p-6 text-center",
                                            children: [
                                                (categoryImage || isEditMode && selectedCategory?.image) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mb-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: categoryImage ? URL.createObjectURL(categoryImage) // new image
                                                         : selectedCategory.image.startsWith("http") ? selectedCategory.image // old image (full url)
                                                         : `${__TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$app$2f$api$2f$api$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IMAGE_BASE_URL"]}${selectedCategory.image}` // old image (relative)
                                                        ,
                                                        alt: "Category preview",
                                                        className: "w-32 h-32 object-cover rounded-xl mx-auto"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                                        lineNumber: 408,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                                    lineNumber: 407,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                    className: "w-10 h-10 mx-auto mb-2 text-gray-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                                    lineNumber: 423,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-600 mb-3",
                                                    children: isEditMode ? "Upload new image to replace" : "Upload category image"
                                                }, void 0, false, {
                                                    fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                                    lineNumber: 424,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "file",
                                                    accept: "image/*",
                                                    onChange: handleImageUpload,
                                                    className: "hidden",
                                                    id: "image-upload"
                                                }, void 0, false, {
                                                    fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                                    lineNumber: 429,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "image-upload",
                                                    className: "inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer text-sm font-semibold",
                                                    children: "Choose File"
                                                }, void 0, false, {
                                                    fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                                    lineNumber: 438,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                            lineNumber: 403,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                    lineNumber: 398,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold mb-2",
                                            children: "Category Name"
                                        }, void 0, false, {
                                            fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                            lineNumber: 451,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: categoryName,
                                            onChange: (e)=>setCategoryName(e.target.value),
                                            placeholder: "Enter category name",
                                            className: "w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC93C]"
                                        }, void 0, false, {
                                            fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                            lineNumber: 452,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                    lineNumber: 450,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sahil$2f$Duzaro_webadmin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: isEditMode ? handleUpdateCategory : handleSubmit,
                                    disabled: !categoryName || !isEditMode && !categoryImage,
                                    className: "w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed",
                                    children: isEditMode ? "Update" : "Submit"
                                }, void 0, false, {
                                    fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                                    lineNumber: 462,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                            lineNumber: 395,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                    lineNumber: 378,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
                lineNumber: 377,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sahil/Duzaro_webadmin/app/admin/category/page.tsx",
        lineNumber: 253,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5eeac591._.js.map