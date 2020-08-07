from django.db import models

# Create your models here.
import cx_Oracle as ora
import pandas as pd

class Mapper:
    def __init__(self, database):
        self.database = database
    def getUserData(self,  userid):
        conn = ora.connect(self.database)
        sql_select = f"select * from signup where aid = '{userid}'"
        datas = pd.read_sql(sql_select, con=conn)
        conn.close()
        return datas
    def getmemberdata(self, usernum):
        conn = ora.connect(self.database)
        sql_select = f"select s.anum ANUM , s.aid AID , s.apwd APWD , s.ainday AINDAY , s.achgday ACHGDAY , s.agubun AGUBUN , s.adivision ADIVISION , m.dname DNAME ,m.dbirth DBIRTH , m.dgender DGENDER , m.dtel , p.psdate , p.pedate , p.ppay , p.pway , p.pgubun , p.monthnum , pd.kinds , pd.mentnum , pd.inment  from signup s , member_detail m , payment p , payment_detail pd  where s.anum = m.dnum and s.anum = p.pnum and s.anum = pd.pdnum and s.anum = '{usernum}'"
        datas = pd.read_sql(sql_select, con=conn)
        conn.close()
        return datas
    def getGuName(self):
        conn = ora.connect(self.database)
        sql_select = "select distinct sname from writing_tag"
        datas = pd.read_sql(sql_select, con=conn)
        conn.close()
        return datas
    def getDongName(self, guName):
        conn = ora.connect(self.database)
        sql_select = f"select distinct hname from writing_tag where sname ='{guName}'"
        datas = pd.read_sql(sql_select, con=conn)
        conn.close()
        return datas
