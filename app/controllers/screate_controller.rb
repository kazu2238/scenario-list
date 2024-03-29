class ScreateController < ApplicationController

  def top
    @text = params["text"]
    @title = params["title"]
    @other = params["other"]
    @names = params["name"]
    @multi_names = params["multi-name"]
    @colors = params["color"]
    @sex = params["sex"]
    @multi_sex = params["multi-sex"]
    @padding = params["padding"]
    @datas = params["data"]
    @multi_datas = params["multi-data"]
    @style_change = params["style_change"]
    @multi_check = {}
    @multi_check = params["multi"]
    @name_cnt = {}

    if @multi_check.blank?
      @multi_check = nil
    end
    if @names.present?
      @names.each{|n|
        if multi_name_check(@multi_names, n)
          @multi_names[n.first].each{|m|
            if m[1].present?
              @name_cnt.store("#{n.first}-#{m.first}" , 0)
            end
          }
        end
        if n[1].blank?
          @names.delete(n.first)
          @sex.delete(n.first)
          @colors.delete(n.first)
          @datas.delete(n.first)
        else
          @name_cnt.store(n.first , 0)
        end
      }
    end

    if @text.present?
      @html_text = create()
    end
  end

  def create()
    men = 0
    women = 0
    humon = 0
    table_text = ""
    
    @names = @names.permit!.to_hash
    if @multi_names.present?
      @multi_names = params["multi-name"].permit!.to_hash
    end

    #比率
    @sex.each{|s|
      case s[1]
      when "men"
        men += 1
      when "women"
        women += 1
      when "humon"
        humon += 1
      end
    }

    table_text = "<html>\n"

    if @title != ""
      table_text = "<title>#{@title}</title>\n"
    end

    #スタイル指定
    if @style_change.present? || @padding.to_i != 0
      table_text += "\n<style>\n"
    end

    #テーブルレイアウト
    if @style_change.present?
      table_text += "table{ border: 0px; border-right: 1px dotted #DCDCDC; border-collapse: collapse; border-spacing: 0px;}\n"
      table_text += "td{ border-right: 0px; border-left: 0px; border-bottom: 1px solid #A9A9A9;}\n"
      table_text += "td:nth-of-type(1){ background-color: #DCDCDC;border-right: 1px solid #A9A9A9;}"
      table_text += "td:nth-of-type(2){ background-color: #F5F5F5;border-right: 1px solid #A9A9A9;}\n"
    end
    if @padding.to_i != 0
      table_text += "td{padding:#{@padding.to_i}px;}\n"
    end

    #文字色
    @colors.each{|c|
      if @colors[c.first] =~ /#000000/
        @colors.delete(c.first)
      else
        table_text += ".color-#{color_class(c.first)}{\n\tcolor:#{c[1]};\n}\n"
      end
    }

    if @style_change.present? || @padding.to_i != 0
      table_text += "</style>\n\n"
    end

    table_text += "<body>\n"

    if @title != ""
      table_text += "<br>\n<br>\n<center style='font-size:33px;'>#{@title}</center>\n"+ ("<br>\n" * 5 )
    end

    if @other != ""
      table_text += "#{@other.gsub(/(\r\n|\r|\n)/, "<br>\n")}" + ("<br>\n" * 4)
    end

    #役一覧
    table_text += "<strong>&#9794;#{men} &#9792;#{women} 不問#{humon} 計#{men+women+humon}</strong><br>\n<br>\n<br>\n<br>\n登場人物<small>(総セリフ数：(serif-sum))</small><br>\n<br>\n<br>\n"
    @names.each{|name|
      table_text += "<strong class='color-#{color_class(name.first)}'>#{name[1]}</strong>（#{sex_icon(@sex[name.first])}）<small>(セリフ数：(serif-#{name.first}))</small>"
      if @multi_check.present?
        if @multi_check[name.first].present?
          if multi_name_check(@multi_names,name)
            table_text += "<br>\n"
          else
            table_text += "（他の役と被り）<br>\n"
          end
        else
          table_text += "<br>\n"
        end
        if @datas[name.first].present?
          table_text += @datas[name.first] + "<br>\n"
        else
          table_text += "<br>\n"
        end
        if multi_name_check(@multi_names,name)
          table_text += "<div style='margin-left:10px;'>"
          @multi_names[name.first].each{|m_name|
            if m_name[1].present?
              table_text += "<br>\n<span class='color-#{color_class(name.first)}'>#{m_name[1]}</span>（#{sex_icon(@multi_sex[name.first][m_name.first])}）<small>(セリフ数：(serif_#{name.first}_#{m_name.first}))</small>（<span class='color-#{color_class(name.first)}'>#{name[1]}</span>と被り）<br>\n"
              if @multi_datas[name.first].present?
                table_text += "#{@multi_datas[name.first][m_name.first]}<br>\n"
              end
            else
              next
            end
          }
          table_text += "</div>"
        end
        table_text += "<br>\n"
      else
        table_text += "<br>\n"
        if @datas[name.first].present?
          table_text += @datas[name.first] + "<br>\n<br>\n"
        else
          table_text += "<br>\n"
        end
      end
    }

    #配役入力欄作成
    table_text += "<textarea cols='50' rows='#{@names.length + 2}' name='haiyaku'>"
    @names.each{|name|
      table_text += "#{name[1]}(#{sex_icon(@sex[name.first],true)})"
      if @multi_check.present?
        if @multi_check[name.first].present?
          if multi_name_check(@multi_names, name)
            @multi_names[name.first].each{|m_name|
              if m_name[1].present?
                table_text += "&#{m_name[1]}(#{sex_icon(@multi_sex[name.first][m_name.first],true)})"
              end
            }
          else
            table_text += "(被り)"
          end
        end
      end
      table_text += "：\n"
    }
    table_text += "</textarea><br>\n<br>\n"

    #本文テーブル作成
    table_text += "<table border='1'>\n"
    br_flag = false
    color_flag = false

    line_cnt = 1
    @text.lines{|line|
      #line = line.gsub(/!\"\n))(?=\")/, "&quot;")
      line = line.gsub(/\R/, "")
      if br_flag
        table_text += "\t\t" + line.gsub(/\"/, "")
        if line =~ /\"/ 
          br_flag = false
          table_text += "</td>\n\t</tr>\n"
        else
          #セル内改行
          table_text += "<br>\n"
        end
      else
        
        if line =~ /^\t/ 
          table_text += "\t<tr>\n\t\t<td></td>\n"
        else
          table_text += "\t<tr>\n\t\t<td>#{sprintf("%03d",line_cnt)}</td>\n"
          line_cnt += 1
        end
        @names.each{|name|
          if @multi_check.present?
            if multi_name_check(@multi_names, name) && @multi_check[name.first].present?
              @multi_names[name.first].each{|m_name|
                if( line =~ /^#{m_name[1]}\t/ || line =~ /\t#{m_name[1]}\t/ || line =~ /\t#{m_name[1]}M\t/ || line =~ /\t#{m_name[1]}N\t/) && m_name[1].present?
                  color_flag = true
                  table_text += tab_to_td(line, name.first)
                  @name_cnt["#{name.first}-#{m_name.first}"] += 1
                  break
                end
              }
            end
          end
          if color_flag
            break
          end
          if line =~ /^#{name[1]}\t/ || line =~ /\t#{name[1]}\t/ || line =~ /\t#{name[1]}M\t/ || line =~ /\t#{name[1]}N\t/
            color_flag = true
            table_text += tab_to_td(line, name.first)
            @name_cnt[name.first] += 1
            break
          end
        }
        unless color_flag
          table_text += tab_to_td(line, nil)
        end
        if line =~ /\"/ 
          #セル内がある時
          table_text += "<br>\n"
          br_flag = true
        else
          if color_flag || line =~ /^\t/
          table_text += "</span></td>\n\t</tr>\n"
          else
          table_text += "</td>\n\t</tr>\n"
          end
        end
        color_flag = false
      end
    }
    table_text += "</table><br>\nEND\n"
    table_text += "</body>\n</html>"

    table_text = table_text.gsub(/\(serif-sum\)/, (line_cnt - 1).to_s)
    @names.each{|n|
        if multi_name_check(@multi_names, n)
          @multi_names[n.first].each{|m|
            table_text = table_text.gsub(/\(serif_#{n.first}_#{m.first}\)/, @name_cnt["#{n.first}-#{m.first}"].to_s)
          }
        end
      table_text = table_text.gsub(/\(serif-#{n.first}\)/, @name_cnt[n.first].to_s)
    }

    return table_text
  end

  def tab_to_td(line, color = nil )
    change_text = ""
    if color && @colors[color]
      change_text = "\t\t<td><span class='color-#{color_class(color)}'>"
      change_text += line.gsub(/\t/, "</span></td>\n\t\t<td><span class='color-#{color_class(color)}'>")
    else
      change_text = "\t\t<td>"
      if line =~ /^\t/
      change_text += line.gsub(/\t/, "</td>\n\t\t<td><span style='font-size:14px;font-style:oblique'>")
      else
      change_text += line.gsub(/\t/, "</td>\n\t\t<td>")
      end
    end
    change_text = change_text.gsub(/[\"]/, "")

    return change_text
  end

  #性別の記号を取得
  def sex_icon(sex,list = false)
    case sex
    when "men"
      return "&#9794;"
    when "women"
      return "&#9792;"
    when "humon"
      if list == true
        return "&#9794;・&#9792;"
      else
        return "不問"
      end
    end
  end


  #デフォルトの色ではわかりやすいクラス名にする
  def color_class(color)
    case @colors[color]
    when "#000000"
      return "black"
    when "#ff0000"
      return "red"
    when "#0000ff"
      return "blue"
    when "#006600"
      return "green"
    when "#7e0021"
      return "brown"
    when "#9933ff"
      return "purple"
    when "#daa520"
      return "yellow"
    else
      return color
    end
  end

  def preview()
    @html = params["html"]
    render layout: "screate_preview_layout"
  end

  def multi_name_check(arr,n)
    if arr
      if arr[n.first].present?
        if arr[n.first]["0"].present?
          return true
        end
      end
    end
    return false
  end

end