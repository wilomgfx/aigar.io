package io.aigar.model

trait TeamRepository {
  def createTeam(team: Team): Boolean
  def readTeam(id: Int): Team
  def updateTeam(id: Int): Boolean
  def deleteTeam(id: Int): Boolean
  def getTeams(): List[Team]
}
