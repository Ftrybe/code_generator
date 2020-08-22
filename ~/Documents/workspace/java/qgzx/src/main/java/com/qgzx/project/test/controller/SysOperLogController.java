package com.qgzx.project/test.controller;

import com.qgzx.framework.web.validator.groups.AddGroup;
import com.qgzx.framework.web.validator.groups.DefaultGroup;
import com.qgzx.framework.web.validator.groups.EditGroup;
import com.qgzx.framework.web.controller.BaseController;
import com.qgzx.framework.web.validator.AjaxResponse;
import com.qgzx.framework.persistence.PageUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.qgzx.project/test.domain.SysOperLog;
import com.qgzx.project/test.service.SysOperLogService;

@Api(tags = "操作日志记录-接口")
@RestController
public class SysOperLogController extends BaseController {
    @Autowired
    private SysOperLogService sysOperLogService;

    /**
    * 根据ID查询操作日志记录
    * @param id
    * @return
    */
    @ApiOperation(value = "根据ID查询操作日志记录",notes = "根据ID进行操作日志记录查询，id不可为空。",position = 1)
    @ApiImplicitParam(name = "id", value = "操作日志记录ID", required = true, dataType = "long", paramType = "path")
    @PreAuthorize("@ss.hasPermi('sys:oper_log:query')")
    @GetMapping("/sysOperLogs/{id}")
    public AjaxResponse<SysOperLog> findById(@PathVariable("id") Long id){
        SysOperLog sysOperLog = sysOperLogService.get(id);
        AjaxResponse<SysOperLog> ajaxResponse = AjaxResponse.success();
        ajaxResponse.setData(sysOperLog);
        return ajaxResponse;
    }

    /**
    * 获取所有操作日志记录数据。分页情况下：入参含有pagenum和pagesize即可，如若排序另加入入参为ordercolumn和sort
    * @param sysOperLog
    * @return
    */
    @ApiOperation(value = "获取所有或分页获取操作日志记录数据",notes = "分页情况下：入参含有pagenum和pagesize即可，如若排序另加入入参为ordercolumn和sort",position = 2)
    @ApiImplicitParams({
        @ApiImplicitParam(name = "pagenum", value = "页码数（分页下使用）", required = false, dataType = "int", paramType = "query"),
        @ApiImplicitParam(name = "pagesize", value = "每页条数（分页下使用）", required = false, dataType = "int", paramType = "query"),
        @ApiImplicitParam(name = "ordercolumn", value = "排序列（分页下使用）", required = false, dataType = "string", paramType = "query"),
        @ApiImplicitParam(name = "sort", value = "排序顺序（分页下使用，升序：asc；降序：desc）", required = false, dataType = "string", paramType = "query",allowableValues = "asc,desc")
    })
    @PreAuthorize("@ss.hasPermi('sys:oper_log:query')")
    @GetMapping("/sysOperLogs")
    public AjaxResponse<List<SysOperLog>> findAll(SysOperLog sysOperLog){
        //启动是否分页，必须保证调用该方法后，后续查询语句为要分页的语句，下个select会使用分页查询，用完即失效。
        PageUtils.startPage();
        List<SysOperLog> sysOperLogList = sysOperLogService.getByDynamicWhere(sysOperLog);
        //对查询数据进行转换，转换成前端需要的数据结构。
        AjaxResponse<List<SysOperLog>> ajaxResponse = converPageData(sysOperLogList);
        return ajaxResponse;
    }

    /**
    * 新增操作日志记录
    * @param sysOperLog
    * @return
    */
    @ApiOperation(value = "新增操作日志记录",notes = "新增一个操作日志记录",position = 20)
    @PreAuthorize("@ss.hasPermi('sys:oper_log:add')")
    @PostMapping("/sysOperLogs")
    public AjaxResponse save(@Validated({DefaultGroup.class,AddGroup.class}) SysOperLog sysOperLog){
        sysOperLogService.save(sysOperLog);
        return AjaxResponse.success("新增成功");
    }

    /**
    * 修改操作日志记录
    * @param sysOperLog
    * @return
    */
    @ApiOperation(value = "修改操作日志记录",notes = "修改操作日志记录数据",position = 30)
    @PreAuthorize("@ss.hasPermi('sys:oper_log:update')")
    @PutMapping("/sysOperLogs")
    public AjaxResponse update(@Validated({DefaultGroup.class,EditGroup.class}) SysOperLog sysOperLog){
        sysOperLogService.update(sysOperLog);
        return AjaxResponse.success("修改成功");
    }

    /**
    * 动态修改操作日志记录[常用于更新个别字段，比如审核状态、数据状态等]
    * @param sysOperLog
    * @return
    */
    @ApiOperation(value = "动态修改操作日志记录",notes = "常用于更新个别字段，比如审核状态、数据状态等",position = 31)
    @PreAuthorize("@ss.hasPermi('sys:oper_log:state')")
    @PutMapping("/sysOperLogSelectives")
    public AjaxResponse updateSelective(SysOperLog sysOperLog){
        sysOperLogService.updateSelective(sysOperLog);
        return AjaxResponse.success("操作成功");
    }

    /**
    * 根据ID删除操作日志记录
    * @param id
    * @return
    */
    @ApiOperation(value = "删除操作日志记录",notes = "根据ID删除操作日志记录",position = 50)
    @ApiImplicitParam(name = "id", value = "操作日志记录ID", required = true, dataType = "long", paramType = "path")
    @PreAuthorize("@ss.hasPermi('sys:oper_log:delete')")
    @DeleteMapping("/sysOperLogs/{id}")
    public AjaxResponse delete(@PathVariable("id") Long id){
        sysOperLogService.delete(id);
        return AjaxResponse.success("删除成功");
    }
}