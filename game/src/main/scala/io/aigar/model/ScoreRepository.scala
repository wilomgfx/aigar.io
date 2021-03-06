package io.aigar.model

import com.mchange.v2.c3p0.ComboPooledDataSource
import slick.driver.H2Driver.api._
import java.util.logging.{Level, Logger}

class ScoreRepository(db: Database) {
  def addScore(playerId: Int, value: Float): Unit = {
    ScoreDAO.addScore(db, playerId, value)
  }

  def getScoresForPlayer(playerId: Int): List[ScoreModel] = {
    ScoreDAO.getScoresForPlayer(db, playerId)
  }

  def createSchema: Unit = {
    ScoreDAO.createSchema(db)
  }

  def dropSchema: Unit = {
    ScoreDAO.dropSchema(db)
  }
}
