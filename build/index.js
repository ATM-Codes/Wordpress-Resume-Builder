/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/FieldInput.js"
/*!**************************************!*\
  !*** ./src/components/FieldInput.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FieldInput)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function FieldInput({
  field,
  value,
  onChange,
  disabled
}) {
  if (field.type === 'bool') {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
        type: "checkbox",
        checked: !!value,
        onChange: e => onChange(e.target.checked),
        disabled: disabled
      }), field.label]
    });
  }
  if (field.type === 'list') {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
      children: [field.label, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
        value: (value ?? []).join('\n'),
        onChange: e => onChange(e.target.value.split('\n')),
        disabled: disabled
      })]
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
    children: [field.label, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
      type: field.type ?? 'text',
      value: value ?? '',
      onChange: e => onChange(e.target.value),
      disabled: disabled
    })]
  });
}

/***/ },

/***/ "./src/components/ResumeEditor.js"
/*!****************************************!*\
  !*** ./src/components/ResumeEditor.js ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResumeEditor)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _FieldInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FieldInput */ "./src/components/FieldInput.js");
/* harmony import */ var _SectionEditor_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SectionEditor.js */ "./src/components/SectionEditor.js");
/* harmony import */ var _utils_moveItem_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/moveItem.js */ "./src/utils/moveItem.js");
/* harmony import */ var _utils_createId_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/createId.js */ "./src/utils/createId.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);








const PERSONAL_FIELDS = [{
  key: 'firstName',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('First Name', 'resume-builder')
}, {
  key: 'lastName',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Last Name', 'resume-builder')
}, {
  key: 'email',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Email', 'resume-builder'),
  type: 'email'
}, {
  key: 'phone',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Phone', 'resume-builder')
}, {
  key: 'linkedin',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('LinkedIn', 'resume-builder')
}, {
  key: 'github',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('GitHub', 'resume-builder')
}];
const SECTION_FIELDS = {
  education: [{
    key: 'institution',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Institution', 'resume-builder')
  }, {
    key: 'qualification',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Qualification', 'resume-builder')
  }, {
    key: 'grade',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Grade', 'resume-builder')
  }, {
    key: 'location',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Location', 'resume-builder')
  }, {
    key: 'startDate',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Start Date', 'resume-builder'),
    type: 'month'
  }, {
    key: 'endDate',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('End Date', 'resume-builder'),
    type: 'month'
  }],
  experience: [{
    key: 'jobTitle',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Job Title', 'resume-builder')
  }, {
    key: 'company',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Company', 'resume-builder')
  }, {
    key: 'location',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Location', 'resume-builder')
  }, {
    key: 'startDate',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Start Date', 'resume-builder'),
    type: 'month'
  }, {
    key: 'current',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Currently Working', 'resume-builder'),
    type: 'bool'
  }, {
    key: 'endDate',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('End Date', 'resume-builder'),
    type: 'month'
  }, {
    key: 'bullets',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Highlights', 'resume-builder'),
    type: 'list'
  }],
  awards: [{
    key: 'awardName',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Award Name', 'resume-builder')
  }, {
    key: 'organization',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Organization', 'resume-builder')
  }, {
    key: 'dateReceived',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Awarded Date', 'resume-builder'),
    type: 'month'
  }, {
    key: 'bullets',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Highlights', 'resume-builder'),
    type: 'list'
  }]
};
function ResumeEditor({
  resume,
  onSaved,
  onBack
}) {
  const [draft, setDraft] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(resume);
  const [status, setStatus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [isSaving, setIsSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  function updateTitle(value) {
    setDraft(current => ({
      ...current,
      title: value
    }));
  }
  function updatePersonal(field, value) {
    setDraft(current => ({
      ...current,
      content: {
        ...current.content,
        personal: {
          ...current.content.personal,
          [field]: value
        }
      }
    }));
  }
  function updateSection(sectionId, change) {
    setDraft(current => ({
      ...current,
      content: {
        ...current.content,
        sections: current.content.sections.map(section => section.id === sectionId ? change(section) : section)
      }
    }));
  }
  function addItem(sectionId) {
    updateSection(sectionId, section => ({
      ...section,
      items: [...section.items, {
        id: _utils_createId_js__WEBPACK_IMPORTED_MODULE_6__["default"]
      }]
    }));
  }
  function removeItem(sectionId, itemId) {
    updateSection(sectionId, section => ({
      ...section,
      items: section.items.filter(item => item.id !== itemId)
    }));
  }
  function updateItem(sectionId, itemId, field, value) {
    updateSection(sectionId, section => ({
      ...section,
      items: section.items.map(item => item.id === itemId ? {
        ...item,
        [field]: value
      } : item)
    }));
  }
  function moveSection(index, direction) {
    setDraft(current => ({
      ...current,
      content: {
        ...current.content,
        sections: (0,_utils_moveItem_js__WEBPACK_IMPORTED_MODULE_5__["default"])(current.content.sections, index, index + direction)
      }
    }));
  }
  function handleSave() {
    setIsSaving(true);
    setStatus('');
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
      path: `/resbuild/v1/resumes/${draft.id}`,
      method: 'PUT',
      data: {
        title: draft.title,
        content: draft.content
      }
    }).then(saved => {
      setDraft(saved);
      onSaved(saved);
      setStatus((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Saved.', 'resume-builder'));
    }).catch(err => setStatus(err.message)).finally(() => setIsSaving(false));
  }
  const personal = draft.content?.personal ?? {};
  const sections = draft.content?.sections ?? [];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button", {
        type: "button",
        onClick: onBack,
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Back to resumes', 'resume-builder')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("label", {
        children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Resume Title', 'resume-builder'), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input", {
          value: draft.title,
          onChange: e => updateTitle(e.target.value)
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("fieldset", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("legend", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Personal Details', 'resume-builder')
        }), PERSONAL_FIELDS.map(field => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_FieldInput__WEBPACK_IMPORTED_MODULE_3__["default"], {
          field: field,
          value: personal[field.key],
          onChange: value => updatePersonal(field.key, value)
        }, field.key))]
      }), sections.map((section, index) => {
        const fields = SECTION_FIELDS[section.type];
        if (!fields) {
          return null;
        }
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_SectionEditor_js__WEBPACK_IMPORTED_MODULE_4__["default"], {
          section: section,
          fields: fields,
          onAddItem: () => addItem(section.id),
          onRemoveItem: itemId => removeItem(section.id, itemId),
          onUpdateItem: (itemId, field, value) => updateItem(section.id, itemId, field, value),
          onMoveUp: () => moveSection(index, -1),
          onMoveDown: () => moveSection(index, 1),
          isFirst: index === 0,
          isLast: index === sections.length - 1
        }, section.id);
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button", {
        type: "button",
        onClick: handleSave,
        disabled: isSaving,
        children: isSaving ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Saving…', 'resume-builder') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save', 'resume-builder')
      }), status && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("p", {
        role: "status",
        children: status
      })]
    })
  });
}

/***/ },

/***/ "./src/components/ResumeList.js"
/*!**************************************!*\
  !*** ./src/components/ResumeList.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResumeList)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Lists the current user's resumes with edit and delete actions.
 */

function ResumeList({
  resumes,
  onSelect,
  onDelete,
  onExport
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("ul", {
    className: "resbuild-list",
    children: resumes.map(resume => {
      const modified = resume.modified ? new Date(resume.modified).toLocaleString() : '';
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("li", {
        className: "resbuild-list__item",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3", {
            className: "resbuild-list__title",
            children: resume.title
          }), modified && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
            className: "resbuild-list__meta",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Modified: %s', 'resume-builder'), modified)
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: "resbuild-list__actions",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
            type: "button",
            className: "resbuild-link",
            onClick: () => onSelect(resume.id),
            "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Edit %s', 'resume-builder'), resume.title),
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Edit', 'resume-builder')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
            type: "button",
            className: "resbuild-link resbuild-link--danger",
            onClick: () => onDelete(resume.id),
            "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Delete %s', 'resume-builder'), resume.title),
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Delete', 'resume-builder')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
            type: "button",
            className: "resbuild-link resbuild-link--pdf",
            onClick: () => onExport(resume.id),
            "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Export as PDF', 'resume-builder'), resume.title),
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Export', 'resume-builder')
          })]
        })]
      }, resume.id);
    })
  });
}

/***/ },

/***/ "./src/components/ResumePreview.js"
/*!*****************************************!*\
  !*** ./src/components/ResumePreview.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResumePreview)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function formatRange(start, end, current) {
  const to = current ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Present', 'resume-builder') : formatMonth(end);
  return [formatMonth(start), to].filter(Boolean).join(' – ');
}
function formatMonth(value) {
  if (!value) {
    return '';
  }
  const [year, month] = value.split('-');
  return new Date(Number(year), Number(month) - 1).toLocaleDateString(undefined, {
    month: 'short',
    year: 'numeric'
  });
}
function ExperienceItem({
  item
}) {
  const bullets = (item.bullets ?? []).filter(line => line.trim());
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "resbuild-preview__item",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "resbuild-preview__row",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("strong", {
        children: [item.jobTitle, item.company].filter(Boolean).join(', ')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
        children: formatRange(item.startDate, item.endDate, item.current)
      })]
    }), item.location && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "resbuild-preview__muted",
      children: item.location
    }), bullets.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("ul", {
      children: bullets.map((line, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("li", {
        children: line
      }, i))
    })]
  });
}
function EducationItem({
  item
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "resbuild-preview__item",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "resbuild-preview__row",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("strong", {
        children: [item.qualification, item.institution].filter(Boolean).join(', ')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
        children: formatRange(item.startDate, item.endDate)
      })]
    }), [item.location, item.grade].filter(Boolean).join(', ')]
  });
}
function AwardsItem({
  item
}) {
  const bullets = (item.bullets ?? []).filter(line => line.trim());
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "resbuild-preview__item",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "resbuild-preview__row",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("strong", {
        children: [item.awardName, item.organization].filter(Boolean).join(', ')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
        children: formatRange(item.dateReceived)
      })]
    }), bullets.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("ul", {
      children: bullets.map((line, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("li", {
        children: line
      }, i))
    })]
  });
}
const ITEM_COMPONENTS = {
  education: EducationItem,
  experience: ExperienceItem,
  awards: AwardsItem
};
const SECTION_LABELS = {
  education: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Education', 'resume-builder'),
  experience: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Experience', 'resume-builder'),
  awards: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Awards', 'resume-builder')
};
function ResumePreview({
  resume,
  onBack
}) {
  // 1. Read personal and sections from resume.content, with ?? fallbacks.

  const personal = resume.content?.personal ?? {};
  const sections = resume.content?.sections ?? [];
  const fullName = [personal.firstName, personal.lastName].filter(Boolean).join(' ');
  const contact = [personal.email, personal.phone, personal.linkedin, personal.github].filter(Boolean).join(' · ');

  // 3. Return:
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "resbuild-no-print",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
        type: "button",
        onClick: onBack,
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Back', 'resume-builder')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
        type: "button",
        onClick: () => window.print(),
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Download PDF', 'resume-builder')
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("article", {
      className: "resbuild-preview",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h2", {
        children: fullName
      }), contact && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
        className: "resbuild-preview__muted",
        children: contact
      }), sections.map(section => {
        const Item = ITEM_COMPONENTS[section.type];
        if (!Item || section.items.length === 0) {
          return null;
        }
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("section", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3", {
            children: SECTION_LABELS[section.type]
          }), section.items.map(item => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Item, {
            item: item
          }, item.id))]
        }, section.id);
      })]
    })]
  });
}

/***/ },

/***/ "./src/components/SectionEditor.js"
/*!*****************************************!*\
  !*** ./src/components/SectionEditor.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SectionEditor)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FieldInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FieldInput */ "./src/components/FieldInput.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



function SectionEditor({
  section,
  fields,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
  onMoveUp,
  onMoveDown,
  isFirst = false,
  isLast = false
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("fieldset", {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("legend", {
      children: section.type
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", {
      type: "button",
      onClick: onMoveUp,
      disabled: isFirst,
      "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Move %s up', 'resume-builder'), section.type),
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Move Up', 'resume-builder')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", {
      type: "button",
      onClick: onMoveDown,
      disabled: isLast,
      "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Move %s Down', 'resume-builder'), section.type),
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Move Down', 'resume-builder')
    }), section.items.map(item => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      children: [fields.map(field => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_FieldInput__WEBPACK_IMPORTED_MODULE_1__["default"], {
        field: field,
        value: item[field.key],
        onChange: value => {
          onUpdateItem(item.id, field.key, value);
          if (field.key === 'current' && value) {
            onUpdateItem(item.id, 'endDate', '');
          }
        },
        disabled: field.key === 'endDate' && item.current
      }, field.key)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", {
        type: "button",
        onClick: () => onRemoveItem(item.id),
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Remove', 'resume-builder')
      })]
    }, item.id)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", {
      type: "button",
      onClick: onAddItem,
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add', 'resume-builder')
    })]
  });
}

/***/ },

/***/ "./src/utils/createId.js"
/*!*******************************!*\
  !*** ./src/utils/createId.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createId)
/* harmony export */ });
function createId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

/***/ },

/***/ "./src/utils/moveItem.js"
/*!*******************************!*\
  !*** ./src/utils/moveItem.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ moveItem)
/* harmony export */ });
function moveItem(list, from, to) {
  if (from < 0 || from >= list.length || to < 0 || to >= list.length || from === to) {
    return list;
  }
  const copy = [...list];
  const [entry] = copy.splice(from, 1);
  copy.splice(to, 0, entry);
  return copy;
}

/***/ },

/***/ "./src/app.css"
/*!*********************!*\
  !*** ./src/app.css ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/api-fetch"
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["apiFetch"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.hasOwn(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_ResumeList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/ResumeList.js */ "./src/components/ResumeList.js");
/* harmony import */ var _components_ResumeEditor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/ResumeEditor.js */ "./src/components/ResumeEditor.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_createId_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/createId.js */ "./src/utils/createId.js");
/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.css */ "./src/app.css");
/* harmony import */ var _components_ResumePreview_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/ResumePreview.js */ "./src/components/ResumePreview.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);









function App() {
  const [resumes, setResumes] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
  const [isLoading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(true);
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
  const [selectedId, setSelectedId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
  const [isCreating, setIsCreating] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)('');
  const [previewId, setPreviewId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
  const previewed = resumes.find(resume => resume.id === previewId);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
      path: '/resbuild/v1/resumes'
    }).then(data => setResumes(data)).catch(err => setError(err.message)).finally(() => setIsLoading(false));
  }, []);
  if (isLoading) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Loading resumes…', 'resume-builder')
    });
  }
  if (error) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
      role: "alert",
      children: error
    });
  }
  const selected = resumes.find(resume => resume.id === selectedId);
  function handleSaved(saved) {
    setResumes(current => current.map(resume => resume.id === saved.id ? saved : resume));
  }
  function createResume() {
    setIsCreating(true);
    setNotice('');
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
      path: '/resbuild/v1/resumes',
      method: 'POST',
      data: {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Untitled Resume', 'resume-builder'),
        content: {
          personal: {},
          sections: ['education', 'experience', 'awards'].map(type => ({
            id: (0,_utils_createId_js__WEBPACK_IMPORTED_MODULE_5__["default"])(),
            type,
            items: []
          }))
        }
      }
    }).then(created => {
      setResumes(current => [created, ...current]);
      setSelectedId(created.id);
    }).catch(err => setNotice(err.message)).finally(() => setIsCreating(false));
  }
  function deleteResume(id) {
    if (!window.confirm((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Deleting this resume? This cannot be undone.', 'resume-builder'))) {
      return;
    }
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
      path: `/resbuild/v1/resumes/${id}`,
      method: 'DELETE'
    }).then(() => setResumes(current => current.filter(resume => resume.id !== id))).catch(err => setNotice(err.message));
  }
  if (selected) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_ResumeEditor_js__WEBPACK_IMPORTED_MODULE_1__["default"], {
        resume: selected,
        onSaved: handleSaved,
        onBack: () => setSelectedId(null)
      }, selected.id)
    });
  }
  if (previewed) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_ResumePreview_js__WEBPACK_IMPORTED_MODULE_7__["default"], {
      resume: previewed,
      onBack: () => setPreviewId(null)
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
    className: "resbuild-app",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
      type: "button",
      onClick: createResume,
      disabled: isCreating,
      children: isCreating ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Creating...', 'resume-builder') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('New Resume', 'resume-builder')
    }), notice && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
      role: "alert",
      children: notice
    }), resumes.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('No resumes yet.', 'resume-builder')
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_ResumeList_js__WEBPACK_IMPORTED_MODULE_0__["default"], {
      resumes: resumes,
      onSelect: setSelectedId,
      onDelete: deleteResume,
      onExport: setPreviewId
    })]
  });
}
const container = document.getElementById('resume-builder-app');
if (container) {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createRoot)(container).render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(App, {}));
}
})();

/******/ })()
;
//# sourceMappingURL=index.js.map