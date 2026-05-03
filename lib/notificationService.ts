import {
  doc, updateDoc, getDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export interface NotificationSettings {
  enabled: boolean;
  diaryReminder: boolean;
  diaryTime: string;
  routineReminder: boolean;
  routineTime: string;
  goalReview: boolean;
  goalReviewDay: number;
  goalReviewTime: string;
  weeklyReport: boolean;
  weeklyReportDay: number;
}

export const DEFAULT_SETTINGS: NotificationSettings = {
  enabled: false,
  diaryReminder: true,
  diaryTime: "21:00",
  routineReminder: true,
  routineTime: "07:00",
  goalReview: true,
  goalReviewDay: 0,
  goalReviewTime: "10:00",
  weeklyReport: true,
  weeklyReportDay: 0,
};

export async function requestPermission(): Promise<boolean> {
  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const result = await Notification.requestPermission();
  return result === "granted";
}

export function canNotify(): boolean {
  return "Notification" in window && Notification.permission === "granted";
}

export function sendNotification(title: string, body: string, icon = "/logo-dourado.png") {
  if (!canNotify()) return;
  const n = new Notification(title, { body, icon });
  n.onclick = () => { window.focus(); n.close(); };
}

export async function saveNotificationSettings(
  userId: string,
  settings: NotificationSettings
): Promise<void> {
  await updateDoc(doc(db, "users", userId), { notificationSettings: settings });
}

export async function getNotificationSettings(
  userId: string
): Promise<NotificationSettings> {
  const snap = await getDoc(doc(db, "users", userId));
  return snap.data()?.notificationSettings ?? DEFAULT_SETTINGS;
}

export function scheduleLocalReminders(settings: NotificationSettings) {
  if (!settings.enabled || !canNotify()) return;
  const now = new Date();
  const checkAndSend = () => {
    const h = now.getHours();
    const m = now.getMinutes();
    const timeStr = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    const dayOfWeek = now.getDay();
    if (settings.diaryReminder && settings.diaryTime === timeStr) {
      sendNotification("📔 Rise Up — Diário", "Que tal registrar como foi seu dia hoje?");
    }
    if (settings.routineReminder && settings.routineTime === timeStr) {
      sendNotification("⚡ Rise Up — Rotina", "Hora de conferir sua rotina do dia!");
    }
    if (settings.goalReview && settings.goalReviewDay === dayOfWeek && settings.goalReviewTime === timeStr) {
      sendNotification("🎯 Rise Up — Metas", "Revise suas metas e atualize o progresso.");
    }
    if (settings.weeklyReport && settings.weeklyReportDay === dayOfWeek && timeStr === "09:00") {
      sendNotification("📊 Rise Up — Relatório semanal", "Seu resumo da semana está pronto!");
    }
  };
  const intervalId = setInterval(checkAndSend, 60000);
  checkAndSend();
  return () => clearInterval(intervalId);
}
