// src/utils/i18nHelper.js
import type { AppMessageCodes } from '../BackEndIntegration/Types/Enums/AppEnums';
import i18n from './i18n'; 

/**
 * @param {string} backendCode 
 * @param {object} params 
 * @returns {string} 
 */
export const getLocalizedMessage = (backendCode:AppMessageCodes, params = {}) => {
  if (!backendCode) {
    return i18n.t('messages.GENERAL_ERROR');
  }

  const translationKey = `messages.${backendCode}`;

  if (!i18n.exists(translationKey)) {
    console.warn(`[i18n Warning]: Missing translation key for code "${backendCode}"`);
    
    return i18n.t('messages.GENERAL_ERROR');
  }

  return i18n.t(translationKey, params);
};