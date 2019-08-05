package com.LeaveSystem.model;


public class LeaveRecord {

  private long leaveRecordId;
  private long leaveRecordStudentId;
  private String leaveRecordReason;
  private java.sql.Timestamp leaveRecordStartTime;
  private java.sql.Timestamp leaveRecordEndtTime;
  private long leaveRecordStartLesson;
  private long leaveRecordEndLesson;
  private String leaveRecordCategory;
  private long leaveRecordNumDays;
  private String leaveRecordApprover;
  private long leaveRecordStage;
  private String leaveRecordApprovalResult;
  private java.sql.Timestamp leaveRecordApprovalTime;
  private long leaveRecordSumLesson;
  private String leaveRecordClassNum;


  public long getLeaveRecordId() {
    return leaveRecordId;
  }

  public void setLeaveRecordId(long leaveRecordId) {
    this.leaveRecordId = leaveRecordId;
  }


  public long getLeaveRecordStudentId() {
    return leaveRecordStudentId;
  }

  public void setLeaveRecordStudentId(long leaveRecordStudentId) {
    this.leaveRecordStudentId = leaveRecordStudentId;
  }


  public String getLeaveRecordReason() {
    return leaveRecordReason;
  }

  public void setLeaveRecordReason(String leaveRecordReason) {
    this.leaveRecordReason = leaveRecordReason;
  }


  public java.sql.Timestamp getLeaveRecordStartTime() {
    return leaveRecordStartTime;
  }

  public void setLeaveRecordStartTime(java.sql.Timestamp leaveRecordStartTime) {
    this.leaveRecordStartTime = leaveRecordStartTime;
  }


  public java.sql.Timestamp getLeaveRecordEndtTime() {
    return leaveRecordEndtTime;
  }

  public void setLeaveRecordEndtTime(java.sql.Timestamp leaveRecordEndtTime) {
    this.leaveRecordEndtTime = leaveRecordEndtTime;
  }


  public long getLeaveRecordStartLesson() {
    return leaveRecordStartLesson;
  }

  public void setLeaveRecordStartLesson(long leaveRecordStartLesson) {
    this.leaveRecordStartLesson = leaveRecordStartLesson;
  }


  public long getLeaveRecordEndLesson() {
    return leaveRecordEndLesson;
  }

  public void setLeaveRecordEndLesson(long leaveRecordEndLesson) {
    this.leaveRecordEndLesson = leaveRecordEndLesson;
  }


  public String getLeaveRecordCategory() {
    return leaveRecordCategory;
  }

  public void setLeaveRecordCategory(String leaveRecordCategory) {
    this.leaveRecordCategory = leaveRecordCategory;
  }


  public long getLeaveRecordNumDays() {
    return leaveRecordNumDays;
  }

  public void setLeaveRecordNumDays(long leaveRecordNumDays) {
    this.leaveRecordNumDays = leaveRecordNumDays;
  }


  public String getLeaveRecordApprover() {
    return leaveRecordApprover;
  }

  public void setLeaveRecordApprover(String leaveRecordApprover) {
    this.leaveRecordApprover = leaveRecordApprover;
  }


  public long getLeaveRecordStage() {
    return leaveRecordStage;
  }

  public void setLeaveRecordStage(long leaveRecordStage) {
    this.leaveRecordStage = leaveRecordStage;
  }


  public String getLeaveRecordApprovalResult() {
    return leaveRecordApprovalResult;
  }

  public void setLeaveRecordApprovalResult(String leaveRecordApprovalResult) {
    this.leaveRecordApprovalResult = leaveRecordApprovalResult;
  }


  public java.sql.Timestamp getLeaveRecordApprovalTime() {
    return leaveRecordApprovalTime;
  }

  public void setLeaveRecordApprovalTime(java.sql.Timestamp leaveRecordApprovalTime) {
    this.leaveRecordApprovalTime = leaveRecordApprovalTime;
  }


  public long getLeaveRecordSumLesson() {
    return leaveRecordSumLesson;
  }

  public void setLeaveRecordSumLesson(long leaveRecordSumLesson) {
    this.leaveRecordSumLesson = leaveRecordSumLesson;
  }


  public String getLeaveRecordClassNum() {
    return leaveRecordClassNum;
  }

  public void setLeaveRecordClassNum(String leaveRecordClassNum) {
    this.leaveRecordClassNum = leaveRecordClassNum;
  }

}
