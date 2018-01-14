import { docTypes, sidebarItems, panels, lists, forms } from "./data";

export const registerModule = mod => {
  if (mod.docTypes) {
    mod.docTypes.forEach(docType => {
      docTypes.push(docType);
    });
  }

  if (mod.sidebarItems) {
    Object.keys(mod.sidebarItems).forEach(name => {
      sidebarItems[name] = mod.sidebarItems[name];
    });
  }

  if (mod.panels) {
    Object.keys(mod.panels).forEach(name => {
      panels[name] = mod.panels[name];
    });
  }

  if (mod.lists) {
    Object.keys(mod.lists).forEach(docType => {
      lists[docType] = mod.lists[docType];
    });
  }

  if (mod.forms) {
    Object.keys(mod.forms).forEach(docType => {
      forms[docType] = mod.forms[docType];
    });
  }
};
