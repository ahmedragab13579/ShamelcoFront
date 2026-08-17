// src/utils/i18nHelper.js
import type { AppMessageCodes } from '../BackEndIntegration/Types/Enums/AppEnums';
import i18n from './i18n'; 

/**
 * @param {string} backendCode 
 * @param {object} params 
 * @returns {string} 
 */
export const getLocalizedMessage = (backendCode: AppMessageCodes | string, params = {}) => {
  if (!backendCode) {
    return i18n.t('messages.GENERAL_ERROR');
  }

  const translationKey = `messages.${backendCode}`;

  if (i18n.exists(translationKey)) {
    return i18n.t(translationKey, params);
  }

  if (i18n.exists(backendCode as string)) {
    return i18n.t(backendCode as string, params);
  }

  console.warn(`[i18n Warning]: Missing translation key for code "${backendCode}"`);
  
  if (typeof backendCode === 'string' && (backendCode.includes('SUCCESS') || backendCode.includes('COMPLETED'))) {
    return i18n.t('messages.OPERATION_SUCCESSFUL');
  }

  return i18n.t('messages.GENERAL_ERROR');
};